var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var SuggestionSchema = new mongoose.Schema({
  suggestion: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: [
      'APPROVED',
      'REJECTED',
      'IN_PROGGRESS'
    ],
    default: 'IN_PROGGRESS'
  }
});

SuggestionSchema.plugin(mongoosePaginate);
const SuggestionModel = mongoose.model('Suggestion', SuggestionSchema);

module.exports = SuggestionModel;
