const mongoose = require('mongoose');
const validator = require('validator');

const citySchema = mongoose.Schema(
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
      ref: 'Region',
    },
  },
  {
    timestamps: true,
  }
);

citySchema.virtual('districts', {
  ref: 'District',
  localField: '_id',
  foreignField: 'owner',
});

citySchema.methods.toJSON = function () {
  const city = this;
  const cityObj = city.toObject();
  delete cityObj.__v;
  delete cityObj.createdAt;
  delete cityObj.updatedAt;

  return cityObj;
};

const City = mongoose.model('City', citySchema);

module.exports = City;
