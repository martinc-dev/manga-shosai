const uuidV4 = require('uuid/v4')

const genUuid = uuidV4

const genRandomString = length => {
  const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let string = ''

  for (let i = 0; i < length; i++) {
    string += charSet.charAt(Math.floor(Math.random() * charSet.length))
  }

  return string
}

module.exports = {
  genRandomString,
  genUuid
}
