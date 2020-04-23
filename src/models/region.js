const mongoose = require('mongoose');
const validator = require('validator');

const regionSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

regionSchema.virtual('cities', {
  ref: 'City',
  localField: '_id',
  foreignField: 'owner',
});
// To remove secure properties from response object
regionSchema.methods.toJSON = function () {
  const region = this;
  const regionObj = region.toObject();
  delete regionObj.__v;
  delete regionObj.createdAt;
  delete regionObj.updatedAt;

  return regionObj;
};
const Region = mongoose.model('Region', regionSchema);

module.exports = Region;
