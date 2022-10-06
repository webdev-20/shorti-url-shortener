require('dotenv').config();

const EXPIRY_DAYS = 90;
const PORT = process.env.PORT || 4002
const DBNAME = process.env.NODE_ENV==='production'? 'shorti': 'shorti-dev'

module.exports = {
    EXPIRY_DAYS,
    PORT,
    DBNAME
};
