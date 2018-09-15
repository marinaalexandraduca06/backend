const bcrypt = require('bcrypt');

const UsersService = require('../services/users.service');

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
    const users = await UsersService.getList(query, options);
    return res.status(200).json({
      status: 200,
      result: users
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
}

exports.register = async function (req, res, next) {
  try {
    const testUsername = await UsersService.getItem({
      username: req.body.username
    });
    if (testUsername) {
      return res.status(409).json({
        status: 409,
        message: "Username already used"
      });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: hash,
      phone: req.body.phone
    };
    const createdUser = await UsersService.create(user);
    return res.status(200).json({
      status: 201,
      result: { user: createdUser },
      message: 'User registered succesfully'
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};

exports.login = async function (req, res, next) {
  try {
    const user = await UsersService.getItem({
      username: req.body.username
    });
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: 'Auth failed'
      });
    }
    const matches = await bcrypt.compare(req.body.password, user.password);
    if (!matches) {
      console.log(user)
      return res.status(401).json({
        status: 401,
        message: 'Auth failed'
      });
    }
    const loggedUser = {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      permissions: user.permissions
    }
    return res.status(200).json({
      status: 200,
      message: "Auth successful",
      result: loggedUser
    })
  } catch (err) {
    return res.status(404).json({
      status: 401,
      message: "Auth failed"
    });
  }
}

exports.edit = async function (req, res, next) {
  if (!req.params.id) {
    return res.status(400).json({
      status: 400,
      message: 'Id of the user is required'
    });
  }

  const id = req.params.id;

  const user = {
    id,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    permissions: req.body.permissions
  };

  try {
    const updatedUser = await UsersService.update(user);
    return res.status(201).json({
      status: 201,
      result: updatedUser,
      message: 'User updated succesfully'
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};

exports.delete = async function (req, res, next) {
  if (!req.params.id) {
    return res.status(400).json({
      status: 400,
      message: 'Id of the user is required'
    });
  }

  const id = req.params.id;

  try {
    await UsersService.delete(id);
    return res.status(201).json({
      status: 201,
      message: 'User deleted successfully'
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};