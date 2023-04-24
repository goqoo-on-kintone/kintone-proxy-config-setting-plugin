# kintone Proxy Config 設定プラグイン

[English](/README.md) | [日本語](/README.ja.md)

[kintone.plugin.app.setProxyConfig()](https://cybozu.dev/ja/kintone/docs/js-api/plugins/set-config-for-proxy) を使うためのUIを提供するプラグインです。

## 利用方法

Zip形式での配布は行いませんので、プラグインのパッケージングは各自で実施してください。  

### 環境構築
```
git clone https://github.com/goqoo-on-kintone/kintone-proxy-config-setting-plugin.git
cd kintone-proxy-config-setting-plugin
yarn install
yarn build
```

### 本番用ビルド
```
yarn create-ppk
mv xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.ppk private-production.ppk
yarn package:production
# created dist/plugin-production.zip
```

### 開発ビルド
```
yarn create-ppk
mv xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.ppk private-development.ppk
yarn package
# created dist/plugin-development.zip
```
