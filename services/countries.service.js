const CountryModel = require('../models/country.model');

exports.getList = async function (query, options) {
  try {
    const countries = await CountryModel.paginate(query, options);
    return countries;
  } catch (e) {
    throw Error('Error while paginating countries');
  }
}

exports.create = async function (country) {
  const newCountry = new CountryModel({
    nameRo: country.nameRo,
    nameEn: country.nameEn,
    continentId: country.continentId
  });

  try {
    const savedCountry = await newCountry.save();
    return savedCountry;
  } catch (e) {
    throw Error('Error while creating the country: ' + e);
  }
};