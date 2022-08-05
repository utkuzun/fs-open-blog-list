/* eslint-disable no-undef */
const logger = require('./utils/logger')
const config = require('./utils/config')

const app = require('./app')
const mongoose = require('mongoose')

const PORT = config.PORT || 3003
const mongoUrl = config.MONGODB_URI

const start = async () => {
  try {
    await mongoose.connect(mongoUrl)
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
    })
  } catch (error) {
    logger.info(error)
  }
}

start()
