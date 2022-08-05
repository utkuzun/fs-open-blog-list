const Blog = require('../models/Blog')

const getAll = async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
    res.json(blogs)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body)
    res.status(201).json({ blog })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, create }
