const User = require('../models/user');
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

        const decoded = await jwt.verify(token, "SDFA#%@$%GFHSNsg43IUkhkhfdg"); //process.env.JWT_SECRET

        const user = await User.findById(decoded._id);

        req.user = user;

        next();

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}
