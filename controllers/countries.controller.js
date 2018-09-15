const CountriesService = require('../services/countries.service');

exports.getList = async function (req, res, next) {
  const options = {
    page: req.query.page ? req.query.page : 1,
    limit: req.query.limit ? req.query.limit : 100,
  };

  let query = {};

  if (req.query.filter) {
    query = req.query.filter
  }

  if (req.query.sort) {
    options.sort = req.query.sort;
  }


  try {
    const countries = await CountriesService.getList(query, options);
    return res.status(200).json({
      status: 200,
      result: countries
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
    const country = {
      nameRo: req.body.nameRo,
      nameEn: req.body.nameEn,
      continentId: req.body.continentId
    };
    try {
      const createdCountry = await CountriesService.create(country);
      return res.status(200).json({
        status: 201,
        result: createdCountry,
        message: 'Created country succesfully'
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