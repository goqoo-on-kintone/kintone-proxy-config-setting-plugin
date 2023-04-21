import { loadConfig, saveConfig } from './configUtils'

import type { ProxyConfigKeys, ProxyConfig, ProxyConfigKey, Config } from './configTypes'
import { createInitialProxyConfigKeys, createInitialProxyConfig } from './configTypes'

export const loadProxyConfig = (pluginId: string) => {
  // 普通のconfigとして保存されたproxyConfigのキーを取得
  const { proxyConfigKeys } = loadConfig<ProxyConfigKeys>(pluginId) || createInitialProxyConfigKeys()

  // キーを元にproxyConfigの値をすべて取得
  const proxyConfigs = proxyConfigKeys.map<ProxyConfig>((proxyConfigKey: ProxyConfigKey) => {
    const { url, method } = proxyConfigKey
    const proxyConfig = kintone.plugin.app.getProxyConfig(url, method)
    const { headers, data } = proxyConfig
      ? {
          headers: JSON.stringify(proxyConfig.headers, null, 2),
          data: JSON.stringify(proxyConfig.data, null, 2),
        }
      : createInitialProxyConfig()

    return { url, method, headers, data }
  })

  return { proxyConfigs }
}

const setMultipleProxyConfigs = async (proxyConfigs: ProxyConfig[]) => {
  const parsedConfigs = proxyConfigs.map((proxyConfig) => {
    const { url, method, headers: _headers, data: _data } = proxyConfig
    let headers: Record<string, any>
    let data: Record<string, any>
    try {
      headers = JSON.parse(_headers)
    } catch (err) {
      throw new Error(`正しいJSON文字列ではありません。\n${_headers}\n${err}`)
    }
    try {
      data = JSON.parse(_data)
    } catch (err) {
      throw new Error(`正しいJSON文字列ではありません。\n${_data}\n${err}`)
    }
    return { url, method, headers, data }
  })
  for (const { url, method, headers, data } of parsedConfigs) {
    // eslint-disable-next-line
    kintone.plugin.app.setProxyConfig(url, method, headers, data, () => {})
    // NOTE: 複数一気に処理すると「データベースのロックに失敗しました」と叱られるのでsleepを挟む
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
}

export const saveProxyConfig = async ({ proxyConfigs }: Config, removedProxyConfigs: ProxyConfig[]) => {
  try {
    // 行削除されたproxyConfigを削除
    await setMultipleProxyConfigs(
      removedProxyConfigs.map(({ url, method }) => ({ url, method, headers: '{}', data: '{}' }))
    )
    // 追加・修正のあるproxyConfigを1件ずつ保存
    await setMultipleProxyConfigs(proxyConfigs)

    // proxyConfigのすべてのキーを、普通のconfigに配列として保存
    const proxyConfigKeys = proxyConfigs.map(({ url, method }) => ({ url, method }))
    saveConfig<ProxyConfigKeys>({ proxyConfigKeys })
  } catch (e) {
    alert(e)
  }
}
