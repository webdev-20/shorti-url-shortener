const express = require('express');
const passport = require('passport');
const router = express.Router();
const { postSignup, postLogin, getMyProfile } = require('../controllers/user.controller');

const {isAuthenticated} = require('../middlewares/auth');

router.post('/signup', postSignup);
router.post('/login', postLogin);
router.get('/me', isAuthenticated, getMyProfile)

module.exports = router;
