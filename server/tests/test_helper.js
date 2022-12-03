const Link = require('../src/models/link')
const User = require('../src/models/user')

const initialLinks = [
    {
        url: "https://mongoosejs.com/docs/index.html",
        short: "mgoose"
    },
    {
        url: "https://github.com/webdev-20/TLL-hacktoberfest-2022",
        short: "shorti"
    }
];

const getAllLinksInDB = async () =>{
    const links = await Link.find({})
    return links.map(link=>link.toJSON())
}

const getAllUsersInDB = async () => {
    const users = await User.find({})
    return users.map(user=>user.toJSON())
}

const getLinkByShort = async(short) => {
    const foundLink = await Link.findOne({short})
    return foundLink??null
}

module.exports = {
    initialLinks,
    getAllLinksInDB,
    getAllUsersInDB,
    getLinkByShort
}