const defaultErrorOptions = {
  code: 500,
  operational: true,
  message: 'cannot find data or format error.'
}

const createError = (options) => Object.assign(new Error(), defaultErrorOptions, options)

const captureError = (fn) => (req, res, next) => {
  fn(req, res, next).catch(err => next(err))
}


module.exports = {
  createError,
  captureError
}