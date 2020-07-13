const chalk = require('chalk')

const mark = {
  warn: chalk.red('WARN'),
  info: chalk.blue('INFO')
}

const logWarn = ({ debug = 'N/A', src = '', error = '', description = '' }) => {
  let debugMsg = 'N/A'

  try {
    debugMsg = debug === 'N/A' ? debug : JSON.stringify(debug, null, 2)
  } finally {
    console.error(
      `${mark.warn}
SRC: ${src}
DESCRIPTION: ${description}
ERROR: ${error.stack || error}
DEBUG: ${debugMsg}`
    )
  }
}

const logEvent = ({ event, debug = 'N/A' }) => {
  let debugMsg = 'N/A'

  try {
    debugMsg = debug === 'N/A' ? debug : JSON.stringify(debug, null, 2)
  } finally {
    console.error(
      `${mark.info}
EVENT: ${event}
DEBUG: ${debugMsg}`
    )
  }
}

module.exports = {
  logWarn,
  logEvent
}
