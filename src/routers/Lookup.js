const express = require('express');
const Region = require('../models/region');
const City = require('../models/city');
const District = require('../models/district');
const PostCode = require('../models/postcode');

const router = new express.Router();

// Create Region Method
router.post('/regions', async (req, res) => {
  const regions = req.body;
  console.log(regions);
  try {
    await Region.deleteMany({});
    await Region.insertMany(regions, (error, docs) => {
      if (error) {
        res.status(400).send({ error: error.errmsg });
      }

      res.status(201).send(docs);
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post('/cities', async (req, res) => {
  const cities = req.body;
  // res.status(201).send(cities);
  try {
    await City.deleteMany({});
    await City.insertMany(cities, (error, docs) => {
      if (error) {
        res.status(400).send({ error: error.errmsg });
      }
      const status = { status: 'Data successfully Saved' };
      res.status(201).send(status);
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post('/districts', async (req, res) => {
  const districts = req.body;
  // res.status(201).send(cities);
  try {
    await District.deleteMany({});
    await District.insertMany(districts, (error, docs) => {
      if (error) {
        res.status(400).send({ error: error });
      }
      const status = { status: 'Data successfully Saved' };
      res.status(201).send(status);
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post('/postcodes', async (req, res) => {
  const postcodes = req.body;
  try {
    await PostCode.deleteMany({});
    await PostCode.insertMany(postcodes, (error, docs) => {
      if (error) {
        res.status(400).send({ error: error });
      }
      const status = { status: 'Data successfully Saved' };
      res.status(201).send(status);
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

module.exports = router;
