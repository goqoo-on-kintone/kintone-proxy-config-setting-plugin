# kintone Proxy Config Setting Plugin

[English](/README.md) | [日本語](/README.ja.md)

This plugin provides UI for using [kintone.plugin.app.setProxyConfig()](https://cybozu.dev/ja/kintone/docs/js-api/plugins/set-config-for-proxy).

## How to use

We will not distribute the plug-ins in Zip format, so please package the plug-ins on your own.

### Environment building
```
git clone https://github.com/goqoo-on-kintone/kintone-proxy-config-setting-plugin.git
cd kintone-proxy-config-setting-plugin
yarn install
yarn build
```

### Build for Production
```
yarn create-ppk
mv xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.ppk private-production.ppk
yarn package:production
# created dist/plugin-production.zip
```

### Build for Development
```
yarn create-ppk
mv xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.ppk private-development.ppk
yarn package
# created dist/plugin-development.zip
```
