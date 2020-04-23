const Region = require('../models/region');

const ownerRegion = async (req, res, next) => {
  try {
    console.log(req.originalUrl);
    const match = {};
    if (req.query.region) {
      match.name = { $regex: req.query.region, $options: 'i' };
    } else {
      return res.status(400).send({ error: 'You must provide [region]' });
    }
    console.log(match);
    const region = await Region.findOne(match);
    console.log(region);
    if (!region) {
      throw new Error();
    }

    req.region = region;
    next();
  } catch (e) {
    res.status(400).send({ error: 'region not found!' });
  }
};

module.exports = ownerRegion;
