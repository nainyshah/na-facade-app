const express = require('express');
const Region = require('../models/region');
const { regions_mainframe } = require('../utils/national-address-mainframe');

const router = new express.Router();
// GET /regions?limit=10&skip=20
// GET /regions?sortBy=createdAt:desc
router.get('/regions', async (req, res) => {
  //   console.log(sort);

  try {
    getRegionsData_db(req, (regions) => {
      if (regions.length === 0) {
        // return res.status(200).send({ error: 'no record found!' });
        regions_mainframe(async (error, body) => {
          if (error) {
            return res.send({
              error,
            });
          } else {
            console.log('I am back ===================================>>');
            console.log(body);
            await Region.insertMany(body, (error, docs) => {
              if (error) {
                res.status(400).send({ error: error });
              }
              console.log(
                'Data successfully Saved..===================================>>'
              );
              getRegionsData_db(req, (regions) => {
                res.status(200).send(regions);
              });
            });
          }
        });
      } else {
        console.log(regions);
        res.status(200).send(regions);
      }
    });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

const getRegionsData_db = async (req, callback) => {
  const match = {};
  const sort = {};

  //   filtering
  if (req.query.name) {
    match.name = { $regex: req.query.name, $options: 'i' };
  }
  console.log(match);
  // Sorting
  if (req.query.sortBy) {
    const part = req.query.sortBy.split(':');
    sort[part[0]] = part[1] === 'desc' ? -1 : 1;
  } else {
    sort['_id'] = 1;
  }

  const regions = await Region.find(match)
    .sort(sort)
    .limit(parseInt(req.query.limit))
    .skip(parseInt(req.query.skip));

  callback(regions);
};

module.exports = router;
