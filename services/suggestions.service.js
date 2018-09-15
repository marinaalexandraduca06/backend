const SuggestionModel = require('../models/suggestion.model');

exports.getList = async function (query, options) {
  try {
    const suggestions = await SuggestionModel.paginate(query, options);
    return suggestions;
  } catch (e) {
    throw Error('Error while paginating suggestions');
  }
}

exports.create = async function (suggestion) {
  const newSuggestion = new SuggestionModel({
    suggestion: suggestion.suggestion
  });

  try {
    const savedSuggestion = await newSuggestion.save();
    return savedSuggestion;
  } catch (e) {
    throw Error('Error while creating the suggestion: ' + e);
  }
};

exports.update = async function (suggestion) {
  const id = suggestion.id;
  let oldSuggestion;

  try {
    oldSuggestion = await SuggestionModel.findById(id);
  } catch (e) {
    throw Error('Suggestion could not be found');
  }

  if (!oldSuggestion) {
    return false;
  }

  oldSuggestion.status = suggestion.status || oldSuggestion.status;

  try {
    const savedSuggestion = await oldSuggestion.save();
  } catch (e) {
    throw Error('An error occured while updating the suggestion');
  }
};

exports.delete = async function (id) {
  try {
    const deleted = await SuggestionModel.findOneAndRemove({ _id: id });
  } catch (e) {
    throw Error('Error occured while deleting the suggestion');
  }
};