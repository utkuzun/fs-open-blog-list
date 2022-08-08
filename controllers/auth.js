const { CustomApiError } = require('../errors/CustomApiEror')
const User = require('../models/User')

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new CustomApiError('username and password must be required', 400)
  }

  const user = await User.findOne({ username })

  if (!user) {
    throw new CustomApiError('not a valid user', 401)
  }

  const passwordCheck = await user.comparePassword(password)

  if (!passwordCheck) {
    throw new CustomApiError('Invalid credentials', 403)
  }

  const token = user.createJWT()
  res.json({ username, token, name: user.name })
}

module.exports = { login }
