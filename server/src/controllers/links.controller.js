const {getRandomString} = require('../utils/getRandomString')
const Link = require('../models/link')
const {response} = require('express');

getAllLinks = async (req, res) => {
    const allLinks = await Link.find({})
    if(allLinks){
        return res.status(200).json({
            "success": true,
            "data" : allLinks
        })
    }
    res.status(500).json({
        "success": false,
        "message": "Server Error - Cannot get links"
    })
}

createLink = async (req, res) => {
    if(!req.body.url){
        return res.status(500).json({"success": false, "message":"URL is required."})
    }
    if (!/(www|http:|https:)+[^\s]+[\w]/g.test(req.body.url)){
        return res.status(500).json({ "success": false, "message": "invalid url" })
    }
    const randomString = await getRandomString()
    try{
        const link = new Link({
            url: req.body.url,
            short: randomString
        })
        const savedLink = await link.save()
        return res.status(201).json({
            "original_url": savedLink.url,
            "short_url": savedLink.short
        })
    }catch (error){
        res.status(500).json({"success": false, "message":error.message})
    }
}

getLinkFromCode = async (req,res) => {
    const short = req.params.short
    try{
        const foundLink = await Link.findOne({"short": short})
        if(!foundLink){
            return res.status(500).json({ success: false, error: "short link does not exist" })
        }
        res.redirect(foundLink.url)
    }catch(error){
        res.status(500).json({ success: false, error: "server error" })
    }
}

module.exports = {
    getAllLinks,
    createLink,
    getLinkFromCode
}