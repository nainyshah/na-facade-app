const mongoose = require('mongoose');
const validator = require('validator');

const districtSchema = mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: Number,
      required: true,
      ref: 'City',
    },
  },
  {
    timestamps: true,
  }
);

districtSchema.methods.toJSON = function () {
  const dist = this;
  const distObj = dist.toObject();
  delete distObj.__v;
  delete distObj.createdAt;
  delete distObj.updatedAt;

  return distObj;
};

const District = mongoose.model('District', districtSchema);

module.exports = District;
