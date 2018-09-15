var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var CitySchema = new mongoose.Schema({
  countryId: {
    type: String,
    required: true
  },
  nameRo: {
    type: String,
    required: true
  },
  nameEn: {
    type: String,
    required: true
  },
  descriptionRo: {
    type: String,
    required: true
  },
  descriptionEn: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  nrOfRatings: {
    type: Number,
    default: 0
  },
  nrOfVisitors: {
    type: Number,
    default: 0
  }
});

CitySchema.plugin(mongoosePaginate);
const CityModel = mongoose.model('City', CitySchema);

module.exports = CityModel;
