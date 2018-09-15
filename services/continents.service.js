const ContinentModel = require('../models/continent.model');

exports.getList = async function (reqQuery, reqOptions) {
 try {
   const continents = await ContinentModel.paginate(reqQuery, reqOptions);
   return continents;
 } catch (error) {
   throw Error('An error occurred while getting data' + error);
 }
}

exports.create = async function (continent) {
  const newContinent = new ContinentModel({
    nameRo: continent.nameRo,
    nameEn: continent.nameEn
  });

  try {
    const savedContinent = await newContinent.save();
    return savedContinent;
  } catch (error) {
    throw Error('An error occurred while creating the continent: ' + error);
  }
};