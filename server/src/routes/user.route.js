const express = require('express');
const passport = require('passport');
const router = express.Router();
const { postSignup, postLogin } = require('../controllers/user.controller');

router.post('/signup', passport.authenticate('signup', { session: false }), postSignup);
router.post('/login', postLogin);

module.exports = router;
