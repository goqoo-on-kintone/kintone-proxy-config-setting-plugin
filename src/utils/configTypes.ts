export const METHODS = ['GET', 'POST', 'PUT', 'DELETE'] as const
type Method = (typeof METHODS)[number]

export type Config = {
  proxyConfigs: ProxyConfig[]
}
export type ProxyConfig = {
  url: string
  method: Method
  headers: string
  data: string
}
export const createInitialProxyConfig = (): ProxyConfig => ({
  url: 'https://example.com/api.json',
  method: 'POST',
  headers: '{}',
  data: '{}',
})

export type ProxyConfigKeys = {
  proxyConfigKeys: ProxyConfigKey[]
}
export type ProxyConfigKey = { url: string; method: Method }
const createInitialProxyConfigKey = (): ProxyConfigKey => {
  const { url, method } = createInitialProxyConfig()
  return { url, method }
}
export const createInitialProxyConfigKeys = (): ProxyConfigKeys => ({
  proxyConfigKeys: [createInitialProxyConfigKey()],
})
