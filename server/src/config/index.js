require('dotenv').config();

const EXPIRY_DAYS = 90;
const PORT = (process.env.NODE_ENV === 'test'
    ? process.env.TEST_PORT
    : process.env.PORT) || 4002


module.exports = {
    EXPIRY_DAYS,
    PORT
};
