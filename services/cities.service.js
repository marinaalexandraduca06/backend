const CityModel = require('../models/city.model');

exports.getList = async function (query, options) {
  try {
    const cities = await CityModel.paginate(query, options);
    return cities;
  } catch (e) {
    throw Error('Error while paginating cities');
  }
}

exports.create = async function (city) {
  const newCity = new CityModel({
    countryId: city.countryId,
    nameRo: city.nameRo,
    nameEn: city.nameEn,
    descriptionRo: city.descriptionRo,
    descriptionEn: city.descriptionEn,
    rating: city.rating,
    nrOfRatings: city.nrOfRatings,
    nrOfVisitors: city.nrOfVisitors
  });

  try {
    const savedCity = await newCity.save();
    return savedCity;
  } catch (e) {
    throw Error('Error while creating the city: ' + e);
  }
};

exports.update = async function (city) {
  const id = city.id;
  let oldCity;

  try {
    oldCity = await CityModel.findById(id);
  } catch (e) {
    throw Error('City could not be found');
  }

  if (!oldCity) {
    return false;
  }

  oldCity.countryId = city.countryId || oldCity.countryId;
  oldCity.nameRo = city.nameRo || oldCity.nameRo;
  oldCity.nameEn = city.nameEn || oldCity.nameEn;
  oldCity.descriptionRo = city.descriptionRo || oldCity.descriptionRo;
  oldCity.descriptionEn = city.descriptionEn || oldCity.descriptionEn;
  oldCity.rating = city.rating >= 0 ? city.rating : oldCity.rating;
  oldCity.nrOfRatings = city.nrOfRatings >= 0 ? city.nrOfRatings : oldCity.nrOfRatings;
  oldCity.nrOfVisitors = city.nrOfVisitors >= 0 ? city.nrOfVisitors : oldCity.nrOfVisitors;

  try {
    const savedCity = await oldCity.save();
    return savedCity;
  } catch (e) {
    throw Error('An error occured while updating the city');
  }
};