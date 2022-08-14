const express = require('express')
const { reset } = require('../controllers/tests')

const router = express.Router()

router.route('/reset').post(reset)

module.exports = router
