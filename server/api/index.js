const express = require('express')
const router = express.Router()

router.use(require('./postgres'))

module.exports = router
