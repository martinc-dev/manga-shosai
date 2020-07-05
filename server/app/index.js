const express = require('express')
const cors = require('cors')
const http = require('http')

const env = require('./constants/env')
const apiRoutes = require('./controllers/api')
const { errorMiddleware } = require('./utils/error')
const { logInfo } = require('./utils/log')

const app = express()
const server = http.Server(app) // eslint-disable-line new-cap

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/v1', apiRoutes.v1)

// Error handler middlewares
app.use(errorMiddleware)
server.listen(env.server.port)

logInfo({ event: `SERVER:LISTEN(${env.server.port})` })
