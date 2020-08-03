const { Op } = require('sequelize')

const getPaginationParam = ({ page, size }) => {
  // Page starts with 1
  if (!page || !size) return {}

  return {
    limit: size,
    offset: (page - 1) * size
  }
}

const getSearchTermsForWhere = ({ searchText, fieldName }) => {
  if (!searchText) return null

  return {
    // Only split on std space for i18n
    [fieldName]: { [Op.or]: searchText.split(' ').map(t => ({ [Op.substring]: t })) }
  }
}

module.exports = {
  getPaginationParam,
  getSearchTermsForWhere
}
