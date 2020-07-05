// eslint-disable-rule no-magic-numbers

const defaultEnv = {
  serverPort: 80
}

module.exports = {
  server: {
    port: process.env.PORT || defaultEnv.serverPort
  }
}
