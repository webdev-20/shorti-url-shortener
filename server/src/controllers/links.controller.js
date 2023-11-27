const validator = require('validator')
const { getRandomString } = require('../utils/getRandomString');
const Link = require('../models/link');

const getAllLinks = async (req, res) => {
  const allLinks = await Link.find({});
  if (allLinks) {
    return res.status(200).json({
      success: true,
      data: allLinks,
    });
  }
  res.status(500).json({
    success: false,
    message: 'Server Error - Cannot get links',
  });
};

// Creates Link and save to the database (not linked to any users)
const createLink = async (req, res) => {
  // TODO: probably move these into config
  const minLength = 1;
  const maxLength = 6;

  //TODO: maybe put all the validations into it owns function, possbily in /utils
  if (!req.body.url) {
    return res.status(422).json({
      success: false,
      message: 'URL is required.',
    });
  }
  if (!validator.isURL(req.body.url)) {
    return res.status(422).json({
      success: false,
      message: 'invalid url',
    });
  }
  if (req.body.short) {
    if (req.body.short.length < minLength || req.body.short.length > maxLength) {
      return res.status(422).json({
        success: false,
        message: "short URL isn't the right length",
      });
    }
    // TODO: change getRandomString() to match the short code format (or change this)
    // exact format and allowed characters to be decided
    if (!/^[A-Za-z0-9_-]*$/.test(req.body.short))
      return res.status(422).json({
        success: false,
        message: 'short URL has invalid characters',
      });
    if (await Link.findOne({ short: req.body.short }))
      return res.status(409).json({ success: false, message: 'short URL already exists' });
  }
  // TODO: check req.body.short is not in the reserved strings list (utils/reservedStrings)
  const shortCode = req.body.short || (await getRandomString());
  try {
    const link = new Link({
      url: req.body.url,
      short: shortCode,
      title: req.body.title
    });
    const savedLink = await link.save();
    return res.status(201).json({
      success: true,
      data:savedLink //TODO: update return type on swagger
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// User saving the links
const saveLink = async (req, res) => {

}

const editLink = async (req, res) => {
  try {
    if (!req.body.url && !req.body.title) {
      return res.status(400).json({ success: false, message: 'URL or title is required.' });
    }

    const link = await Link.findOne({ short: req.params.short });

    if (!link) {
      return res.status(404).json({ success: false, message: 'Link not found.' });
    }

    if (req.body.url && !validator.isURL(req.body.url)) {
      return res.status(422).json({ success: false, message: 'invalid url' });
    }

    link.url = req.body.url??link.url;
    link.title = req.body.title??link.title;

    await link.save();

    res.status(200).json({ success: true, message: 'Link updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLinkFromCode = async (req, res) => {
  const short = req.params.short;
  try {
    const foundLink = await Link.findOne({ short: short });
    if (!foundLink) {
      return res.status(404).json({ success: false, error: 'short link does not exist' });
    }
    //TODO: update swagger
    res.status(200).json({success: true, data: {longUrl:foundLink.url}});
  } catch (error) {
    res.status(500).json({ success: false, error: 'server error' });
  }
};

const deleteLink = async (req, res) => {
  const short = req.params.short;
  try {
    const foundLink = await Link.findOne({ short: short });
    if (!foundLink) {
      return res.status(404).json({ success: false, message: 'short link does not exist' });
    }
    await foundLink.remove({});
    res.status(200).json({
      success: true,
      message: 'short link has been successfully deleted',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'server error' });
  }
};

module.exports = {
  getAllLinks,
  createLink,
  editLink,
  getLinkFromCode,
  deleteLink,
};
