const mongoose = require('mongoose');
const validator = require('validator');

const postcodeSchema = mongoose.Schema(
  {
    postcode: {
      type: Number,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
      trim: true,
    },
    longitude: {
      type: Number,
      required: true,
      trim: true,
    },
    cityname: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostCode = mongoose.model('PostCode', postcodeSchema);

module.exports = PostCode;
