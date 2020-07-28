const { Op } = require('sequelize')
const pathModule = require('path')

const {
  models: { Folder }
} = require('./db')
const { sort: sortEnum } = require('../constants/query')
const { maximumPathDepth } = require('../constants/path')
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

const getChildrenFolderOfPathNameAsync = ({
  path,
  name,
  sort = sortEnum.createdAtAsc,
  page = 0,
  size = 0
}) => {
  return getFoldersByPathAsync({
    path: `${path}/${name}`,
    sort,
    page,
    size
  })
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

module.exports = {
  getFolderByUuidAsync,
  getFoldersByPathAsync,
  getFolderByPathNameAsync,
  getChildrenFolderOfPathNameAsync,
  getAncestryOfPathAsync
}
