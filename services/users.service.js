const UserModel = require('../models/user.model');

exports.getItem = async function (query, callback) {
  return UserModel.findOne(query, callback);
}

exports.getList = async function (query, options) {
  try {
    const users = await UserModel.paginate(query, options);
    return users;
  } catch (error) {
    throw Error('Error while paginating users');
  }
}

exports.create = async function (user) {
  const newUser = new UserModel({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    password: user.password,
    phone: user.phone
  });

  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw Error('An error occurred while creating user: ' + error);
  }
};

exports.update = async function (user) {
  const id = user.id;
  let oldUser;

  try {
    oldUser = await UserModel.findById(id);
  } catch (error) {
    throw Error('User could not be found');
  }

  if (!oldUser) {
    return false;
  }

  oldUser.firstName = user.firstName || oldUser.firstName;
  oldUser.lastName = user.lastName || oldUser.lastName;
  oldUser.username = user.username || oldUser.username;
  oldUser.email = user.email || oldUser.email;
  oldUser.password = user.password || oldUser.password;
  oldUser.phone = user.phone || oldUser.phone;
  oldUser.permissions = user.permissions || oldUser.permissions;

  try {
    const savedUser = await oldUser.save();
    return savedUser;
  } catch (error) {
    throw Error('An error occured while updating the user');
  }
};

exports.delete = async function (id) {
  try {
    const deleted = await UserModel.findOneAndRemove({ _id: id });
  } catch (e) {
    throw Error('Error occured while deleting the user');
  }
};
