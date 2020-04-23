const express = require('express');
const Region = require('../models/region');
const { postcode_mainframe } = require('../utils/national-address-mainframe');

const router = new express.Router();
