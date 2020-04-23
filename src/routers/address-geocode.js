const express = require('express');
const Region = require('../models/region');
const {
  addressbyGeoCode_mainframe,
} = require('../utils/national-address-mainframe');

const router = new express.Router();
router.get('/address-sa', async (req, res) => {
  try {
    if (!req.query.lat) {
      return res.send({
        error: 'You must provide [lat/long].',
      });
    }
    if (!req.query.long) {
      return res.send({
        error: 'You must provide [lat/long].',
      });
    }
    const lat = req.query.lat;
    const long = req.query.long;
    addressbyGeoCode_mainframe(lat, long, async (error, body) => {
      if (error) {
        return res.send({
          error,
        });
      } else {
        console.log('I am back ===================================>>');
        console.log(body);
        if (!body) {
          return res.status(404).send({ error: 'no record found!' });
        }
        res.status(200).send(body);
      }
    });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
