const sort = {
  folderCreatedAtAsc: ['folderCreatedAt', 'ASC'],
  folderCreatedAtDesc: ['folderCreatedAt', 'DESC'],
  folderUpdatedAtAsc: ['folderUpdatedAt', 'ASC'],
  folderUpdatedAtDesc: ['folderUpdatedAt', 'DESC'],
  fileCreatedAtAsc: ['fileCreatedAt', 'ASC'],
  fileCreatedAtDesc: ['fileCreatedAt', 'DESC'],
  fileUpdatedAtAsc: ['fileUpdatedAt', 'ASC'],
  fileUpdatedAtDesc: ['fileUpdatedAt', 'DESC'],
  createdAtAsc: ['createdAt', 'ASC'],
  createdAtDesc: ['createdAt', 'DESC'],
  updatedAtAsc: ['updatedAt', 'ASC'],
  updatedAtDesc: ['updatedAt', 'DESC'],
  nameAsc: ['name', 'ASC'],
  nameDesc: ['name', 'DESC'],
  extAsc: ['ext', 'ASC'],
  extDesc: ['ext', 'DESC'],
  sizeAsc: ['size', 'ASC'],
  sizeDesc: ['size', 'DESC']
}

const pageSize = {
  0: 0,
  25: 25,
  50: 50,
  100: 100
}

module.exports = {
  sort,
  pageSize
}
