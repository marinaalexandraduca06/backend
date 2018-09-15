const CitiesService = require('../services/cities.service');

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
  if (req.query.sortAdditional) {
    options.sort = [[req.query.sortAdditional, 'desc'], [req.query.sort, 'asc']];
  }
  try {
    const cities = await CitiesService.getList(query, options);
    return res.status(200).json({
      status: 200,
      result: cities
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
    const city = {
      countryId: req.body.countryId,
      nameRo: req.body.nameRo,
      nameEn: req.body.nameEn,
      descriptionRo: req.body.descriptionRo,
      descriptionEn: req.body.descriptionEn
    };
    const createdCity = await CitiesService.create(city);
    return res.status(200).json({
      status: 201,
      result: createdCity,
      message: 'Created city succesfully'
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
      message: 'Id of the city is required'
    });
  }
  const city = {
    id: req.params.id,
    countryId: req.body.countryId,
    nameRo: req.body.nameRo,
    nameEn: req.body.nameEn,
    descriptionRo: req.body.descriptionRo,
    descriptionEn: req.body.descriptionEn,
    rating: req.body.rating,
    nrOfRatings: req.body.nrOfRatings,
    nrOfVisitors: req.body.nrOfVisitors
  };
  try {
    const updatedCity = await CitiesService.update(city);
    return res.status(201).json({
      status: 201,
      result: updatedCity,
      message: 'City updated succesfully'
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};