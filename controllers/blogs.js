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

const update = async (req, res) => {
  const { id } = req.params
  const newBlog = req.body

  const blog = await Blog.findByIdAndUpdate(
    { _id: id },
    { ...newBlog },
    {
      new: true,
      runValidators: true,
    })

  console.log(blog)
  res.json({ blog })
}

module.exports = { getAll, create, remove, update }
