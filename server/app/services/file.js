const { Op } = require('sequelize')

const {
  models: { File }
} = require('./db')
const { sort: sortEnum } = require('../constants/query')
const { getPaginationParam, getSearchTermsForWhere } = require('../utils/query')

const getFileByUuidAsync = ({ uuid }) =>
  File.findOne({
    where: {
      uuid: {
        [Op.eq]: uuid
      }
    }
  })

const getFilesByFolderUuidAsync = ({
  folderUuid,
  sort = sortEnum.createdAtAsc,
  page = 0,
  size = 0,
  searchText = ''
}) =>
  File.findAll({
    where: {
      folderUuid: {
        [Op.eq]: folderUuid
      },
      ...getSearchTermsForWhere({ searchText, fieldName: 'name' })
    },
    order: [sort],
    ...getPaginationParam({ page, size })
  })

const createFileAsync = ({ name, ext, size, thumbnail }) =>
  File.create({ name, ext, size, thumbnail })

const deleteAllFilesAsync = () => File.destroy({ where: {} })

module.exports = {
  getFileByUuidAsync,
  getFilesByFolderUuidAsync,
  createFileAsync,
  deleteAllFilesAsync
}
