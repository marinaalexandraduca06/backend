const SuggestionsService = require('../services/suggestions.service');

exports.getList = async function (req, res, next) {
  const options = {
    page: req.query.page ? req.query.page : 1,
    limit: req.query.limit ? req.query.limit : 100
  };
  let query = {};
  if (req.query.filter) {
    query = req.query.filter
  }
  if (req.query.sort) {
    options.sort = req.query.sort;
  }
  try {
    const suggestions = await SuggestionsService.getList(query, options);
    return res.status(200).json({
      status: 200,
      result: suggestions
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
}

exports.create = async function (req, res, next) {
  try {
    const suggestion = {
      suggestion: req.body.suggestion
    };
    const createdSuggestion = await SuggestionsService.create(suggestion);
    return res.status(200).json({
      status: 201,
      result: createdSuggestion,
      message: 'Created suggestion succesfully'
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};

exports.edit = async function (req, res, next) {
  if (!req.params.id) {
    return res.status(400).json({
      status: 400,
      message: 'Id of the suggestion is required'
    });
  }
  const suggestion = {
    id: req.params.id,
    suggestion: req.body.suggestion,
    status: req.body.status
  };
  try {
    const updatedSuggestion = await SuggestionsService.update(suggestion);
    return res.status(201).json({
      status: 201,
      result: updatedSuggestion,
      message: 'Suggestion updated succesfully'
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};

exports.delete = async function (req, res, next) {
  if (!req.params.id) {
    return res.status(400).json({
      status: 400,
      message: 'Id of the suggestion is required'
    });
  }

  const id = req.params.id;

  try {
    await SuggestionsService.delete(id);
    return res.status(201).json({
      status: 201,
      message: 'Suggestion deleted successfully'
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};