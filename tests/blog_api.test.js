const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const supertest = require('supertest')

const testHelpers = require('./test_helpers')

const Blog = require('../models/Blog')

const app = require('../app')
const api = supertest(app)

describe('blogs api tests', () => {

  beforeEach(async () => {
    let mongoServer = await MongoMemoryServer.create()
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

  test('toJSON methods', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
  })

  test('test post requst', async () => {
    const blog = {
      title: 'mal',
      author: 'mal',
      url: 'mal.com',
      likes: 11 }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(testHelpers.initialBlogs.length +1)
    expect(response.body.map(blog => blog.title)).toContain(blog.title)


  })

  test('test default value for likes 0', async () => {
    const blog = {
      title: 'mal',
      author: 'mal',
      url: 'mal.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)

    expect(response.body.blog.likes).toBeDefined()
    expect(response.body.blog.likes).toBe(0)

  })

  test('test required for url and title', async () => {
    const blogWOTitle = {
      title: '',
      author: 'mal',
      url: 'mal.com',
    }

    const blogWOUrl = {
      title: 'utku',
      author: 'mal',
      url: '',
    }

    await api.post('/api/blogs').send(blogWOTitle).expect(400)
    await api.post('/api/blogs').send(blogWOUrl).expect(400)
  })

  afterEach(async () => {
    await mongoose.connection.close()
  })

})

