const User = require('../models/User')
const { CustomApiError } = require('../errors/CustomApiEror')

const getAll = async (req, res) => {
  const users = await User.find({}).populate('blogs', { user : 0 })
  res.json(users)
}

const create = async (req, res) => {
  const { username } = req.body

  const userAdded = await User.findOne({ username })

  if(userAdded) {
    console.log(userAdded)
    throw new CustomApiError('username must be unique', 400)
  }

  const user = await User.create(req.body)

  res.status(201).json(user)
}

module.exports = { create, getAll }