const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async (req, res, next) => {

    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                message: "Please login first",
                success: false
            })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.user._id);

        next();
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}