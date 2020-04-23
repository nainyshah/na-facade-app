const express = require('express');
const City = require('../models/city');
const District = require('../models/district');
const ownerCity = require('../middleware/owner-city');
const { districts } = require('../utils/national-address-mainframe');
const router = new express.Router();

router.get('/districts', ownerCity, async (req, res) => {
  try {
    getDistrictData_db(req, (dist) => {
      // console.log('count : ..... ', dist);
      if (dist.length > 0) {
        res.status(200).send(dist);
      } else {
        console.log('No Record Found!!!');
        // console.log(req.city._id);

        // Need to call mainframe API in case of no record in Database
        districts(req.city._id, async (error, body) => {
          if (error) {
            return res.send({
              error,
            });
          } else {
            console.log('I am back ===================================>>');
            // console.log(body);
            await District.insertMany(body, (error, docs) => {
              if (error) {
                res.status(400).send({ error: error });
              }
              console.log(
                'Data successfully Saved..===================================>>'
              );
              // const status = { status: 'Data successfully Saved' };
              // res.status(201).send(status);
              getDistrictData_db(req, (dist) => {
                res.status(200).send(dist);
              });
            });
          }
        });
        // Main Frame Get Districts Area
        //res.status(404).send({ error: 'record not found!' });
      }
    });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});
const getDistrictData_db = async (req, callback) => {
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
  //   console.log(sort);

  await req.city
    .populate({
      path: 'districts',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
      },
      sort,
    })
    .execPopulate();
  callback(req.city.districts);
};

module.exports = router;
