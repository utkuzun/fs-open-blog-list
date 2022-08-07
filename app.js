const cors = require('cors')
const express = require('express')
const app = express()
require('express-async-errors')

const { morganIns, notFound, errorHandler } = require('./utils/middleware')

const blogsRouter = require('./routers/blogs')
const usersRouter = require('./routers/users')

app.use(cors())
app.use(express.json())
app.use(morganIns)


app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app
