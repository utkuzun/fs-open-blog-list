const express = require('express')

const { getAll, create, remove } = require('../controllers/blogs')
const router = express.Router()

router.route('/').get(getAll).post(create)
router.route('/:id').delete(remove)


module.exports = router