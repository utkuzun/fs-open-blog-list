const express = require('express')

const { getAll, create } = require('../controllers/blogs')
const router = express.Router()

router.route('/').get(getAll).post(create)

module.exports = router