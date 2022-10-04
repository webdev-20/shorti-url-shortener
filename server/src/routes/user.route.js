const router = require('express').Router()
const userController = require('../controllers/user.controller')

const { isAuthenticated } = require('../middlewares/auth');

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/me', isAuthenticated, userController.myProfile)
router.get('/logout', isAuthenticated, userController.logoutUser)

module.exports = router