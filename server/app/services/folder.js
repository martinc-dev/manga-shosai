const { Op } = require('sequelize')

const {
  models: { Folder }
} = require('./db')
const { sort: sortEnum } = require('../constants/query')
const { getPaginationParam } = require('../utils/query')

const getFolderByUuidAsync = ({ uuid }) =>
  Folder.findOne({
    where: {
      uuid: {
        [Op.eq]: uuid
      }
    }
  })

const getFoldersByPathAsync = ({ path, sort = sortEnum.createdAtAsc, page = 0, size = 0 }) =>
  Folder.findAll({
    where: {
      path: {
        [Op.eq]: path
      }
    },
    order: [sort],
    ...getPaginationParam({ page, size })
  })

const getFoldersByPathNameAsync = ({
  path,
  name,
  sort = sortEnum.createdAtAsc,
  page = 0,
  size = 0
}) =>
  Folder.findAll({
    where: {
      path: {
        [Op.eq]: path
      },
      name: {
        [Op.eq]: name
      }
    },
    order: [sort],
    ...getPaginationParam({ page, size })
  })

module.exports = {
  getFolderByUuidAsync,
  getFoldersByPathAsync,
  getFoldersByPathNameAsync
}
