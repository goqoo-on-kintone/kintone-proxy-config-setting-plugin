module.exports = {
  bundlerType: 'default',
  dtsGen: {
    env: 'development',
  },
  environments: [
    {
      env: 'development',
      host: 'example.cybozu.com',
      appId: {
        app: 0,
        config: 0,
      },
    },
  ],
}
