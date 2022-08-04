/* eslint-disable no-undef */
require('dotenv').config()

const app = require('./app')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3003
const mongoUrl = process.env.MONGODB_URI

const start = async () => {
  try {
    await mongoose.connect(mongoUrl)
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
