const jwt = require('jsonwebtoken');
const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
const postSignup = (req, res, next) => {
  try {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
      validationErrors.push('Please enter a valid email address.');
    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push('Password must be at least 8 characters long');
    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push('Passwords do not match');

    if (validationErrors.length) {
      return res.status(400).json({ success: false, message: validationErrors });
    }

    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
      all_lowercase: true,
    });

    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    User.findOne({ email: user.email }, (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Account with that email address already exists.',
        });
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ success: true, message: 'Sign up successful.' });
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const postLogin = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(500).json({ success: false, message: info.message });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
        return res
        .cookie('token', token, { httpOnly: true })
        .status(200).json({ success: true, message: 'Log in successful.', token });
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  })(req, res, next);
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password').populate('links');

    res.status(200).json({
      success: true,
      user 
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message 
    });
  }
}

module.exports = {
  postSignup,
  postLogin,
  getMyProfile
};
