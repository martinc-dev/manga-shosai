const pathModule = require('path')
const dir = require('node-dir')

const { hiddenFilenameRegex } = require('../constants/regex')

const scanPath = targetPath => {
  return new Promise((resolve, reject) => {
    dir.files(targetPath, 'all', (error, results) => {
      if (error) reject(error)
      else resolve(results)
    })
  })
}

const filterExcluded = ({ filePaths, folderPaths }) => ({
  folderPaths,
  filePaths: filePaths.filter(filePath => {
    const { name } = pathModule.parse(filePath)
    const excludePatterns = [hiddenFilenameRegex]

    for (let i = excludePatterns.length - 1; i >= 0; i--) {
      if (new RegExp(excludePatterns[i]).test(name)) return false
    }

    return true
  })
})

const fulfillDirInformation = () => true // TODO!!!

const fulfillFileInformation = () => true // TODO!!!

const replaceRealPath = ({ path, targetFolderPath }) =>
  pathModule.resolve(path.replace(targetFolderPath, '/'))

module.exports = {
  scanPath,
  filterExcluded,
  fulfillDirInformation,
  fulfillFileInformation,
  replaceRealPath
}
