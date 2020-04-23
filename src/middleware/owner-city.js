const City = require('../models/city');
const ownerCity = async (req, res, next) => {
  try {
    console.log(req.originalUrl);
    const match = {};
    if (req.query.city) {
      match.name = { $regex: req.query.city, $options: 'i' };
    } else {
      return res.status(400).send({ error: 'You must provide [city]' });
    }
    console.log(match);
    const city = await City.findOne(match);
    console.log(city);
    if (!city) {
      throw new Error();
    }

    req.city = city;
    next();
  } catch (e) {
    res.status(400).send({ error: 'city not found!' });
  }
};

module.exports = ownerCity;
