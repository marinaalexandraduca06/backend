const express = require('express');
const UsersController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', UsersController.getList);
router.post('/register', UsersController.register);
router.post('/login', UsersController.login);
router.patch('/:id', UsersController.edit);
router.delete('/:id', UsersController.delete);

module.exports = router;
