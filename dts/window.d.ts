interface Window {
  __pluginEnv__?: Record<string, boolean>
  __pluginDevinfo__?: {
    nodeEnv?: string
    commitHash?: string
    builtAt?: string
  }
}
