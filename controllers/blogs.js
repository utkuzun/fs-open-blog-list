const Blog = require('../models/Blog')

const getAll = async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
}

const create = async (req, res) => {
  const blog = await Blog.create(req.body)
  res.status(201).json({ blog })
}

const remove = async (req, res) => {
  const { id } = req.params
  await Blog.findByIdAndRemove({ _id : id })
  res.status(204).send()
}

module.exports = { getAll, create, remove }
