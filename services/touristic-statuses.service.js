const TouristicStatusModel = require('../models/touristic-status.model');

exports.getList = async function (query, options) {
  try {
    const touristicStatusess = await TouristicStatusModel.paginate(query, options);
    return touristicStatusess;
  } catch (e) {
    throw Error('Error while paginating touristic status');
  }
}

exports.create = async function (touristicStatus) {
  const newTouristicStatus = new TouristicStatusModel({
    userId: touristicStatus.userId,
    cityId: touristicStatus.cityId,
    status: touristicStatus.status,
    rated: touristicStatus.rated
  });

  try {
    const savedTouristicStatus = await newTouristicStatus.save();
    return savedTouristicStatus;
  } catch (e) {
    throw Error('Error while creating the touristic status: ' + e);
  }
};

exports.update = async function (touristicStatus) {
  const id = touristicStatus.id;
  let oldTouristicStatus;

  try {
    oldTouristicStatus = await TouristicStatusModel.findById(id);
  } catch (e) {
    throw Error('Touristic status could not be found');
  }

  if (!oldTouristicStatus) {
    return false;
  }

  oldTouristicStatus.status = touristicStatus.status || oldTouristicStatus.status;
  oldTouristicStatus.userId = touristicStatus.userId || oldTouristicStatus.userId;
  oldTouristicStatus.cityId = touristicStatus.cityId || oldTouristicStatus.cityId;
  oldTouristicStatus.rated = touristicStatus.rated || oldTouristicStatus.rated;

  try {
    const savedTouristicStatus = await oldTouristicStatus.save();
  } catch (e) {
    throw Error('An error occured while updating the touristic status');
  }
};