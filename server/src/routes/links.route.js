const router = require('express').Router()
const linksController = require('../controllers/links.controller')

router.get('/', linksController.getAllLinks)
router.post('/', linksController.createLink)
router.get('/:short', linksController.getLinkFromCode)


module.exports = router