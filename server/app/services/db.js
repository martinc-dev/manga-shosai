const { Sequelize } = require('sequelize')
const { initializeModels } = require('../models')
const { logEvent } = require('../utils/log')

const sequelize = new Sequelize('sqlite::memory:')
const models = initializeModels(sequelize)

const initDBAsync = async () => {
  await Promise.all(Object.keys(models).map(key => models[key].sync({ force: true })))
  logEvent({ event: 'SERVICE:DB:INITIALIZED' })
}

module.exports = {
  initDBAsync,
  models
}
