const Link = require('../models/link');

const getRandomString = async () => {
  let findLinkInDb = true;
  let randomString = '';
  do {
    randomString = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 6);
    // check database if it's already used
    findLinkInDb = await Link.findOne({ short: randomString });
    // console.log(randomString)
  } while (findLinkInDb);
  return randomString;
};

module.exports = {
  getRandomString,
};
