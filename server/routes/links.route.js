const router = require('express').Router()
const linksController = require('../controllers/links.controller')

router.get('/', linksController.get)



module.exports = router