const {getRandomString} = require('../utils/getRandomString')
const Link = require('../models/link')

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
  const minLength = 1;
  const maxLength = 6;
  if(!req.body.url){
    return res.status(500).json({"success": false, "message":"URL is required."})
  }
  if (!/(www|http:|https:)+[^\s]+[\w]/g.test(req.body.url)){
    return res.status(500).json({ "success": false, "message": "invalid url" })
  }
  if(req.body.short.length < minLength || req.body.short.length > maxLength){ 
    return res.status(413).json({ success: false, message: "short URL isn't the right length"})
  }
  if (!/(-)+[^[a-zA-Z]+$]/.test(req.body.short)) return res.status(400).json({ success: false, message: "short URL has invalid characters"})
  if (await Link.findOne({ short: req.body.short }))
    return res
      .status(409)
      .json({ success: false, message: "short URL already exists" });
  const shortCode = req.body.short || (await getRandomString());
  try{
    const link = new Link({
        url: req.body.url,
        short: shortCode
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

module.exports = {
    getAllLinks,
    createLink
}
