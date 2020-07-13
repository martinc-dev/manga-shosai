const { logWarn } = require('./log')

// eslint-disable-next-line max-params,no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const { url } = req
  const status = err?.status ?? 500
  const statusText = err?.statusText ?? err?.message ?? 'Unknown Error'

  logWarn({ url, status, statusText })

  res.status(status).json({
    status,
    statusText
  })
}

module.exports = {
  errorMiddleware
}
