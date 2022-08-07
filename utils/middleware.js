/* eslint-disable no-unused-vars */
const morgan = require('morgan')

const { CustomApiError } = require('../errors/CustomApiEror')
const jwt = require('jsonwebtoken')

morgan.token('body', (req, res) => JSON.stringify(req.body))
const morganIns = morgan(
  ':method :url :status :res[content-length] - :response-time ms :body'
)


const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.toLowerCase().startsWith('bearer')) {
    throw new CustomApiError('no token given', 403)
  }

  const token = authHeader.split(' ')[1]
  const payload = jwt.verify(token, process.env.JWT_SECRET)

  try {
    const { userId, username } = payload
    req.user = { userId, username }
    next()
  } catch (error) {
    throw new CustomApiError('Authentication invalid', 403)
  }
}


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
    customError.message = Object.keys(err.errors).map(attr => `${attr} must be provided`).join(',')
    customError.statusCode = 400
  }
  res.status(customError.statusCode).json({ error: customError.message })
}



module.exports = { morganIns , notFound, errorHandler, authentication }