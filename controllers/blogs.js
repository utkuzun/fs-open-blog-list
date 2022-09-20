const Blog = require('../models/Blog')
const User = require('../models/User')
const { CustomApiError } = require('../errors/CustomApiEror')

const getAll = async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  res.json(blogs)
}

const create = async (req, res) => {
  const { userId } = req.user

  const blog = await Blog.create({ ...req.body, user: userId })

  const user = await User.findOne({ _id: userId })
  user.blogs = [...user.blogs, blog]
  await user.updateOne({ blogs: user.blogs })

  res.status(201).json({ blog })
}

const remove = async (req, res) => {
  const { id } = req.params
  const { userId } = req.user
  const blog = await Blog.findOne({ _id: id })

  if (!blog || !(blog.user.toString() === userId.toString())) {
    throw new CustomApiError('Not authorized to remove this blog', 404)
  }

  await blog.delete()

  const user = await User.findOne({ _id: userId })
  const blogs = user.blogs.filter(
    (item) => item.toString() !== blog.id.toString()
  )

  await user.updateOne({ blogs })

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
    }
  )

  res.json({ blog })
}

const comment = async (req, res) => {
  const { id } = req.params
  const comment = req.body

  const blog = await Blog.findOne({ _id: id })
  const newComments = [...blog.comments, comment.comment]

  const blogUpdated = await Blog.findByIdAndUpdate(
    { _id: id },
    { comments: newComments },
    {
      new: true,
      runValidators: true,
    }
  )

  res.json({ blog: blogUpdated })
}

module.exports = { getAll, create, remove, update, comment }
