const User = require('../models/user')

getAllLinks = async (req, res) => {
    const allLinks = await Link.find({})
    if (allLinks) {
        return res.status(200).json({
            "success": true,
            "data": allLinks
        })
    }
    res.status(500).json({
        "success": false,
        "message": "Server Error - Cannot get links"
    })
}

registerUser = async (req, res) => {
    try{

        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(422).json({
                "success": false,
                "message": "All fields are required"
            })
        }

        const user = await User.findOne({email: email});
        if(user){
            return res.status(409).json({
                "success": false,
                "message": "User already exists"
            })
        }

        const newUser = await User.create({
            name,
            email,
            password
        })

        const token = await newUser.generateToken();

        const options = {
            expiresIn: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200)
        .cookie("token", token, options)
        .json({
            success: true,
            message: "user Successfully registered"
        })

    }
    catch(err){
        res.status(500).json({
            "success": false,
            "message": err.message
        })
    }
}

loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(422).json({
                "success": false,
                "message": "All fields are required"
            })
        }

        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                "success": false,
                "message": "User does not exist"
            })
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({
                "success": false,
                "message": "Invalid credentials"
            })
        }

        const token = await user.generateToken();

        const options = {
            expiresIn: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200)
        .cookie("token", token, options)
        .json({
            success: true,
            message: "user Successfully logged in"
        })

    }
    catch(err){
        res.status(500).json({
            "success": false,
            "message": err.message
        })
    }
}

myProfile = async (req, res) => {
    try{

        const user = await User.findById(req.user._id).populate("links");
        if(!user){
            return res.status(400).json({
                "success": false,
                "message": "User does not exist"
            })
        }

        res.status(200).json({
            "success": true,
            "data": user
        })
    }
    catch(err){
        res.status(500).json({
            "success": false,
            "message": err.message
        })
    }
}

logoutUser = async(req,res)=>{
    try {
        
        res.status(200).cookie("token", null, {expires:new Date(Date.now()), httpOnly:true}).json({
            "message": "Logout successful",
            "success": true
        });

    } catch (error) {
        res.status(500).json({
            "message": error.message,
            "success": false
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    myProfile,
    logoutUser
}
