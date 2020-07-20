const getPaginationParam = ({ page, size }) => {
  // Page starts with 1
  if (!page || !size) return {}

  return {
    limit: size,
    offset: (page - 1) * size
  }
}

module.exports = {
  getPaginationParam
}
