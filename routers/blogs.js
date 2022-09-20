const express = require('express')
const { authentication } = require('../utils/middleware')

const {
  getAll,
  create,
  remove,
  update,
  comment,
} = require('../controllers/blogs')
const router = express.Router()

router.route('/').get(getAll).post(authentication, create)
router.route('/:id').delete(authentication, remove).patch(update)
router.route('/:id/comments').post(comment)

module.exports = router
