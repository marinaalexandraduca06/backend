var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var TouristicStatusSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  cityId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: [
      'VISITED',
      'WISH_LIST',
      'BACKLOG'
    ],
    default: 'BACKLOG'
  },
  rated: {
    type: Boolean,
    required: true,
    default: false
  }
});

TouristicStatusSchema.plugin(mongoosePaginate);
const TouristicStatusModel = mongoose.model('TouristicStatus', TouristicStatusSchema);

module.exports = TouristicStatusModel;
