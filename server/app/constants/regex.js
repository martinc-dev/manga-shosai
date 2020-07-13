const uuidV4Regex = `[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$`
const thumbnailTokenRegex = `[A-Za-z0-9]{16}$`

module.exports = {
  uuidV4Regex,
  thumbnailTokenRegex
}
