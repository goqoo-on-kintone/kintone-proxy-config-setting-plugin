# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

kintone アプリ用プラグイン。`kintone.plugin.app.setProxyConfig()`（プロキシ経由の外部 API 呼び出し設定）を GUI で編集するための UI を提供する。ビルドには [goqoo](https://github.com/goqoo-on-kintone/goqoo) フレームワークを使う。

Zip 配布はせず、利用者が各自でパッケージング・アップロードする方針（README 参照）。

## コマンド

```shell
# 開発ビルド → アップロード → ローカルサーバー起動（以後はローカルサーバー経由で開発）
yarn package:development   # goqoo build（NODE_ENV=development）+ plugin-packer → dist/plugin-development.zip
yarn upload:development
yarn start                 # goqoo start。ローカルサーバー停止中はアップロード済みプログラムが動く

# 本番ビルド → アップロード
yarn package:production    # goqoo release（NODE_ENV=production）+ plugin-packer → dist/plugin-production.zip
yarn upload:production

# 初回セットアップ時の署名鍵作成（private-production.ppk / private-development.ppk を用意する）
yarn create-ppk

yarn lint      # eslint --fix（eslint-config-goqoo）
yarn format    # prettier --write
yarn test      # jest（※現状テストファイルは未整備）
yarn generate  # goqoo g：新規エントリの雛形生成
```

`yarn test` は設定のみで実際のテストファイルは存在しない。単一テスト実行は `yarn jest <path>` または `yarn jest -t "<test name>"`。

## アーキテクチャ

### プラグインの2つのエントリ（goqoo apps）

- `src/apps/config/` — **プラグイン設定画面**。本プラグインの本体。kintone-ui-component の `Table` で URL / Method / Headers / Data を行編集し、Save で保存する。
- `src/apps/app/` — **レコード詳細画面で動く実行側**。現状は設定を `console.info` するだけの最小実装。

各 `index.ts` は `goqoo(entryName('config' | 'app'), () => require('./main'))` でエントリを登録する。`entryName` は `proxy-config-setting-plugin:${kintone.$PLUGIN_ID}:${type}` という形で、プラグイン ID 込みの一意なエントリ名を生成する（同一ページに複数プラグインが載っても衝突しない）。

### 設定の保存モデル（重要）

proxyConfig は**2箇所に分けて保存される**。ここが本リポジトリで最も理解しにくい部分:

1. **proxyConfig 本体**（url, method, headers, data）→ kintone の `setProxyConfig()` / `getProxyConfig()` API に保存。これは kintone が管理する専用ストレージで、値は url+method をキーに個別取得しかできない（一覧取得 API がない）。
2. **proxyConfig のキー一覧**（url, method の配列）→ 通常のプラグイン config（`setConfig()` / `getConfig()`）に保存。

読み込み時（`loadProxyConfig`）は、まず通常 config からキー一覧を取り出し、各キーで `getProxyConfig()` を呼んで本体を復元する。この「キー一覧を別途持つ」仕組みがないと、保存済み proxyConfig を列挙できない。

保存時（`saveProxyConfig`, `src/utils/proxyConfigUtils.ts`）の注意点:
- 削除された行は headers/data を空 `{}` にした setProxyConfig で上書きして無効化する。
- 複数を連続保存すると「データベースのロックに失敗しました」エラーになるため、各 `setProxyConfig` の間に `setTimeout` で 100ms の sleep を挟んでいる。
- headers / data は UI 上は JSON 文字列。保存時に `JSON.parse` し、失敗すると日本語メッセージで throw → `alert` 表示。

### utils

- `src/utils/configUtils.ts` — 汎用の `saveConfig` / `loadConfig`。プラグイン保存容量の上限 256KB 対策として、フォームスキーマを `id` / `var` / `type` のみに絞って保存する。`undefined` は `___undefined___` センチネルで JSON シリアライズ（replacer/reviver）。
- `src/utils/configTypes.ts` — 型定義と初期値ファクトリ（`createInitialProxyConfig` など）。METHODS は `GET|POST|PUT|DELETE`。
- `dts/`, `node_modules/@kintone/dts-gen` — `kintone` / `cybozu` グローバルの型定義。

### ビルド出力

goqoo（webpack, `webpack.config.js`）が `src/apps/*/index.ts` をバンドルし `plugin/js/` に出力する。`plugin/` 一式（manifest 以外の静的資産）を `plugin-development/` / `plugin-production/` の各 manifest とともに plugin-packer で zip 化する。

- `plugin-development/manifest.json` — js に `https://localhost:59000/*.js`（ローカルサーバー）と `plugin/js/*.js` を両方指定。ローカルサーバー起動中はそちらが優先され、ホットに開発できる。
- `plugin-production/manifest.json` — `plugin/js/*.js` のみ。

manifest の `version` を上げる際は dev / prod 両方の manifest.json を更新する。
