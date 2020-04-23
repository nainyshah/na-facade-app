const express = require('express');
const City = require('../models/city');
const ownerRegion = require('../middleware/owner-region');
const { citiesByRegion } = require('../utils/national-address-mainframe');
const router = new express.Router();

router.get('/cities', ownerRegion, async (req, res) => {
  try {
    getCitiesData_db(req, (cities) => {
      // console.log('count : ..... ', cities.length);

      if (cities.length > 0) {
        res.status(200).send(cities);
      } else {
        console.log('Record not found.');
        // console.log(req.region._id);
        // Need to call mainframe API in case of no record in Database
        citiesByRegion(req.region._id, async (error, body) => {
          if (error) {
            return res.send({
              error,
            });
          } else {
            console.log('I am back ===================================>>');
            // console.log(body);
            await City.insertMany(body, (error, docs) => {
              if (error) {
                res.status(400).send({ error: error });
              }
              console.log(
                'Data successfully Saved..===================================>>'
              );
              getCitiesData_db(req, (cities) => {
                res.status(200).send(cities);
              });
            });
          }
        });
        // Main Frame Get Districts Area
      }
    });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

const getCitiesData_db = async (req, callback) => {
  const match = {};
  const sort = {};
  //   filtering
  //   if (req.query.name) {
  //     match.name = { $regex: req.query.name, $options: 'i' };
  //   }
  //   console.log(match);
  // Sorting
  if (req.query.sortBy) {
    const part = req.query.sortBy.split(':');
    sort[part[0]] = part[1] === 'desc' ? -1 : 1;
  } else {
    sort['_id'] = 1;
  }
  await req.region
    .populate({
      path: 'cities',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
      },
      sort,
    })
    .execPopulate();

  console.log('total cities in qassim: ', req.region.cities);
  callback(req.region.cities);
};

module.exports = router;
