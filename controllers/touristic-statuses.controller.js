const TouristicStatusesService = require('../services/touristic-statuses.service');

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
    const touristicStatuses = await TouristicStatusesService.getList(query, options);
    return res.status(200).json({
      status: 200,
      result: touristicStatuses
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
    const touristicStatus = {
      userId: req.body.userId,
      cityId: req.body.cityId,
      status: req.body.status,
      rated: req.body.rated
    };
    const createdTouristicStatus = await TouristicStatusesService.create(touristicStatus);
    return res.status(200).json({
      status: 201,
      result: createdTouristicStatus,
      message: 'Created touristic status succesfully'
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
      message: 'Id of the touristic status is required'
    });
  }
  const touristicStatus = {
    id: req.params.id,
    userId: req.body.userId,
    cityId: req.body.cityId,
    status: req.body.status,
    rated: req.body.rated
  };
  try {
    const updatedTouristicStatus = await TouristicStatusesService.update(touristicStatus);
    return res.status(201).json({
      status: 201,
      result: updatedTouristicStatus,
      message: 'Touristic status updated succesfully'
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};