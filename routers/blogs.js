const express = require('express')
const { authentication } = require('../utils/middleware')

const { getAll, create, remove, update } = require('../controllers/blogs')
const router = express.Router()

router.route('/').get(getAll).post(authentication, create)
router.route('/:id').delete(remove).patch(update)


module.exports = router