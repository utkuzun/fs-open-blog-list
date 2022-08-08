require('dotenv').config()

const initialBlogs = [
  {
    title: 'selam',
    author: 'utku',
    url: 'mal.com',
    likes: 15,
  },
  {
    title: 'hoi',
    author: 'seher',
    url: 'mal.com',
    likes: 35,
  },
  {
    title: 'salut',
    author: 'berke',
    url: 'mal.com',
    likes: 11,
  },
  {
    title: 'hallo',
    author: 'tuna',
    url: 'mal.com',
    likes: 2,
  },
]

const initialUsers = [
  {
    name: 'utku',
    username: 'utku',
    password: process.env.SAMPLE_PASSWORD,
  },
  {
    name: 'mahmut',
    username: 'mahmut',
    password: process.env.SAMPLE_PASSWORD,
  },
]

module.exports = { initialBlogs, initialUsers }
