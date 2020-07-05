const { Router } = require('express')
const folderRouter = require('./folder')
const fileRouter = require('./file')
const thumbnailRouter = require('./thumbnail')

const metaRouter = Router() // eslint-disable-line new-cap
const v1Router = Router() // eslint-disable-line new-cap

// Meta routes
metaRouter.get('/health', (req, res) => res.status(200).json('OK'))

// V1 Routes
v1Router.use('/folder', folderRouter)
v1Router.use('/file', fileRouter)
v1Router.use('/thumbnail', thumbnailRouter)

module.exports = {
  v1: v1Router,
  meta: metaRouter
}
