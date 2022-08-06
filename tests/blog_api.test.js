const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const supertest = require('supertest')

const testHelpers = require('./test_helpers')

const Blog = require('../models/Blog')

const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  const mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), { dbName: 'testBlog' })

  await Blog.deleteMany({})
  await Blog.insertMany(testHelpers.initialBlogs)
}, 10000)


test('gets correct amount of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(testHelpers.initialBlogs.length)
})

test('gets json data', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})



afterAll(async () => {
  await mongoose.disconnect()
}, 10000)
