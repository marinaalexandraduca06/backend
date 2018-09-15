const DestinationModel = require('../models/destination.model');

exports.getList = async function (query, options) {
  try {
    const destinations = await DestinationModel.paginate(query, options);
    return destinations;
  } catch (e) {
    throw Error('Error while paginating destinations');
  }
}

exports.create = async function (destination) {
  const newDestination = new DestinationModel({
    nameRo: destination.nameRo,
    nameEn: destination.nameEn,
    cityId: destination.cityId,
    url: destination.url
  });

  try {
    const savedDestination = await newDestination.save();
    return savedDestination;
  } catch (e) {
    throw Error('Error while creating the destination: ' + e);
  }
};

exports.delete = async function (id) {
  try {
    const deleted = await DestinationModel.findOneAndRemove({ _id: id });
  } catch (e) {
    throw Error('Error occured while deleting the suggestion');
  }
};