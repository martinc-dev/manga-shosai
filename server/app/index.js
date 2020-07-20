const express = require('express')
const cors = require('cors')
const http = require('http')

const env = require('./constants/env')
const { initDBAsync } = require('./services/db')
const apiRoutes = require('./controllers/api')
const { errorMiddleware } = require('./utils/error')
const { logEvent, logWarn } = require('./utils/log')

const initialize = async () => {
  // DB
  await initDBAsync()

  // Server
  const app = express()
  const server = http.Server(app) // eslint-disable-line new-cap

  // Middlewares
  app.use(express.json())
  app.use(cors())

  // Routes
  app.use('/meta', apiRoutes.meta)
  app.use('/api/v1', apiRoutes.v1)

  // Error handler middlewares
  app.use(errorMiddleware)
  server.listen(env.server.port)

  logEvent({ event: `SERVER:LISTEN(${env.server.port})` })
}

try {
  initialize()
} catch (error) {
  logWarn({
    error,
    src: 'MAIN',
    description: 'An uncaught error occurred at runtime'
  })
}
