const sort = {
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
