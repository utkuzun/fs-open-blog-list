const logger = require('./utils/logger')
const config = require('./utils/config')

const app = require('./app')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const PORT = config.PORT || 3003
const mongoUrl = config.MONGODB_URI

const start = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      await mongoose.connect(mongoUrl)
    } else {
      let mongoServer = await MongoMemoryServer.create()
      await mongoose.connect(mongoServer.getUri(), { dbName: 'testBlog' })
    }
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
    })
  } catch (error) {
    logger.info(error)
  }
}

start()
