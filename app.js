const cors = require('cors')
const express = require('express')

const blogsRouter = require('./routers/blogs')

const { morganIns, notFound, errorHandler } = require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morganIns)


app.use('/api/blogs', blogsRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app
