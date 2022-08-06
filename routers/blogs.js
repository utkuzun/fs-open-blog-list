const express = require('express')

const { getAll, create, remove, update } = require('../controllers/blogs')
const router = express.Router()

router.route('/').get(getAll).post(create)
router.route('/:id').delete(remove).patch(update)


module.exports = router