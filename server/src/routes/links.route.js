const router = require('express').Router()
const linksController = require('../controllers/links.controller')

router.get('/', linksController.getAllLinks)



module.exports = router