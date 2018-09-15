const ContinentsService = require('../services/continents.service');

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
    const continents = await ContinentsService.getList(reqQuery, reqOptions);
    return response.status(200).json({
      status: 200,
      result: continents
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
    const continent = {
      nameRo: req.body.nameRo,
      nameEn: req.body.nameEn
    };
    try {
      const createdContinent = await ContinentsService.create(continent);
      return res.status(200).json({
        status: 201,
        result: createdContinent,
        message: 'Created continent succesfully'
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