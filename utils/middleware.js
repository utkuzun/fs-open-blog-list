/* eslint-disable no-unused-vars */
const morgan = require('morgan')

morgan.token('body', (req, res) => JSON.stringify(req.body))
const morganIns = morgan(
  ':method :url :status :res[content-length] - :response-time ms :body'
)

const notFound = (req, res) => {
  res.status(404).json({ error : `Can not access the root ${req.url}` })
}

const errorHandler = (err, req, res, next) => {
  let customError = {
    message: err.message || 'internal server error',
    statusCode: err.statusCode || 500,
  }

  if (err.name === 'CastError') {
    customError.message = 'id is not in correct type'
    customError.statusCode = 400
  }

  if (err.name === 'ValidationError') {
    customError.statusCode = 400
  }
  res.status(customError.statusCode).json({ error: customError.message })
}



module.exports = { morganIns , notFound, errorHandler }