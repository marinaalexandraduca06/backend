var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var DestinationSchema = new mongoose.Schema({
  cityId:{
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
  url: {
    type: String,
    required: true
  }
});

DestinationSchema.plugin(mongoosePaginate);
const DestinationModel = mongoose.model('Destination', DestinationSchema);

module.exports = DestinationModel;
