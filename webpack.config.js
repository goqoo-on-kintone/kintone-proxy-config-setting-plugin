const { merge } = require('webpack-merge')
const baseConfigFactory = require('goqoo/dist/bundler/webpack.config.vue')
const path = require('path')

module.exports = (env, argv) => {
  if (!env) {
    env = {}
  }

  const baseConfig = baseConfigFactory(env, argv)

  const config = merge(baseConfig, {
    output: { path: path.resolve('plugin/js') },
  })

  return config
}
