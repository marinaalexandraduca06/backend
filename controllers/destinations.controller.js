const DestinationsService = require('../services/destinations.service');

exports.getList = async function (params, response, next) {
  const reqOptions = {
    page: params.query.page ? params.query.page : 1,
    limit: params.query.limit ? params.query.limit : 100,
  };
  let reqQuery = {};

  if (params.query.filter) {
    reqQuery = params.query.filter
  }
  if (params.query.sort) {
    reqOptions.sort = params.query.sort;
  }

  try {
    const destinations = await DestinationsService.getList(reqQuery, reqOptions);
    return response.status(200).json({
      status: 200,
      result: destinations
    });
  } catch (e) {
    return response.status(400).json({
      status: 400,
      message: e.message
    });
  }
}

exports.create = async function (req, res, next) {
  try {
    const destination = {
      cityId: req.body.cityId,
      url: req.body.url,
      nameRo: req.body.nameRo,
      nameEn: req.body.nameEn
    };
    try {
      const createdDestination = await DestinationsService.create(destination);
      return res.status(200).json({
        status: 201,
        result: createdDestination,
        message: 'Created destination succesfully'
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: 'Invalid User'
    });
  }
};

exports.delete = async function (req, res, next) {
  if (!req.params.id) {
    return res.status(400).json({
      status: 400,
      message: 'Id of the destination is required'
    });
  }

  const id = req.params.id;

  try {
    await DestinationsService.delete(id);
    return res.status(201).json({
      status: 201,
      message: 'Destination deleted successfully'
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};