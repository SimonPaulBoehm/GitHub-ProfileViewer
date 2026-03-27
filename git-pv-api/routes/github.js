const express = require('express')
const router = express.Router()
const { getProfile, getRepos } = require('../controllers/github')

router.get('/user/:username', getProfile)
router.get('/repos/:username', getRepos)

module.exports = router
