# kintone Proxy Config Setting Plugin

[English](/README.md) | [日本語](/README.ja.md)

This plugin provides UI for using [kintone.plugin.app.setProxyConfig()](https://cybozu.dev/ja/kintone/docs/js-api/plugins/set-config-for-proxy).

## How to use

We will not distribute the plug-ins in Zip format, so please package the plug-ins on your own.

### Environment setup
#### Install
```shell
git clone https://github.com/goqoo-on-kintone/kintone-proxy-config-setting-plugin.git
cd kintone-proxy-config-setting-plugin
yarn install
```
#### Create certificates for production and development
```shell
yarn create-ppk
mv xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.ppk private-production.ppk
yarn create-ppk
mv xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.ppk private-development.ppk
```

### Build and deploy for production
Packaging and uploading in sequence.
```shell
yarn package:production # Created dist/plugin-production.zip
yarn upload:production
```

### Build and deploy for development
Packaging and uploading is done only once, and subsequent development is done via the local server.  
While the local server is down, the uploaded program runs.
```shell
yarn package:development # Created dist/plugin-development.zip
yarn upload:development
yarn start
```
