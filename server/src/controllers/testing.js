const testingRouter = require('express').Router()
const Link = require('../models/link')
const User = require('../models/user')

testingRouter.post('/reset', async(req, res)=>{
    await Link.deleteMany({})
    await User.deleteMany({})

    res.status(204).end()
})

module.exports = testingRouter