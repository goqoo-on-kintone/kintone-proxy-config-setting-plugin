# kintone Proxy Config 設定プラグイン

[English](/README.md) | [日本語](/README.ja.md)

[kintone.plugin.app.setProxyConfig()](https://cybozu.dev/ja/kintone/docs/js-api/plugins/set-config-for-proxy) を使うためのUIを提供するプラグインです。

## 利用方法

Zip形式での配布は行いませんので、プラグインのパッケージングは各自で実施してください。  

### 環境構築
#### インストール
```shell
git clone https://github.com/goqoo-on-kintone/kintone-proxy-config-setting-plugin.git
cd kintone-proxy-config-setting-plugin
yarn install
```
#### 本番用と開発用の証明書を作成
```shell
yarn create-ppk
mv xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.ppk private-production.ppk
yarn create-ppk
mv xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.ppk private-development.ppk
```

### 本番用ビルド、デプロイ
パッケージングとアップロードを順番に行います。
```shell
yarn package:production # Created dist/plugin-production.zip
yarn upload:production
```

### 開発用ビルド、デプロイ
パッケージングとアップロードは一度だけ行い、以降はローカルサーバー経由で開発します。  
ローカルサーバーが止まっている間は、アップロード済みのプログラムが動作します。
```shell
yarn package:development # Created dist/plugin-development.zip
yarn upload:development
yarn start
```
