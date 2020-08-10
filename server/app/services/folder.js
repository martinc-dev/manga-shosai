const { Op } = require('sequelize')
const pathModule = require('path')

const {
  models: { Folder }
} = require('./db')
const { sort: sortEnum } = require('../constants/query')
const { maximumPathDepth } = require('../constants/path')
const { getPaginationParam, getSearchTermsForWhere } = require('../utils/query')

const getFolderByUuidAsync = ({ uuid }) =>
  Folder.findOne({
    where: {
      uuid: {
        [Op.eq]: uuid
      }
    }
  })

const getFoldersByPathAsync = ({
  path,
  sort = sortEnum.folderCreatedAtDesc,
  page = 0,
  size = 0,
  searchText = ''
}) => {
  const query = {
    where: {
      path: {
        [Op.eq]: path
      },
      ...getSearchTermsForWhere({ searchText, fieldName: 'name' })
    },
    order: [sort],
    ...getPaginationParam({ page, size })
  }

  return Folder.findAll(query)
}

const getFolderByPathNameAsync = ({ path, name }) =>
  Folder.findOne({
    where: {
      path: {
        [Op.eq]: path
      },
      name: {
        [Op.eq]: name
      }
    }
  })

const getChildrenFolderOfPathNameAsync = async ({
  path,
  name,
  sort = sortEnum.folderCreatedAtDesc,
  page = 0,
  size = 0,
  searchText = ''
}) => {
  const result = await getFoldersByPathAsync({
    path: pathModule.resolve(path, name || ''),
    sort,
    page,
    size,
    searchText
  })

  return name ? result : result.filter(t => t.dataValues?.name ?? null)
}

const getAncestryOfPathAsync = async ({ path }) => {
  const rootDir = pathModule.parse(path).root
  const ancestors = []

  let currentPath = path
  let depth = 1

  while (currentPath !== rootDir && depth <= maximumPathDepth) {
    const { dir, name } = pathModule.parse(currentPath)

    ancestors.push({ dir, name })
    currentPath = dir
    depth += 1
  }
  ancestors.push({ dir: rootDir, name: null }) // Add the root directory

  return (
    await Promise.all(
      ancestors
        .reverse()
        .map(ancestor => getFolderByPathNameAsync({ path: ancestor.dir, name: ancestor.name }))
    )
  ).filter(t => t)
}

const createFolderAsync = ({ path, name, folderCreatedAt, folderUpdatedAt }) =>
  Folder.create({ path, name, folderCreatedAt, folderUpdatedAt })

const deleteAllFoldersAsync = () => Folder.destroy({ where: {} })

module.exports = {
  getFolderByUuidAsync,
  getFoldersByPathAsync,
  getFolderByPathNameAsync,
  getChildrenFolderOfPathNameAsync,
  getAncestryOfPathAsync,
  createFolderAsync,
  deleteAllFoldersAsync
}
