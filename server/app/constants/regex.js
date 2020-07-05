const uuidV4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
const thumbnailTokenRegex = /[A-Z0-9]{16}/i

module.exports = {
  uuidV4Regex,
  thumbnailTokenRegex
}
