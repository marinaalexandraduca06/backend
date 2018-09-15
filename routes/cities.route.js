const express = require('express');
const CitiesController = require('../controllers/cities.controller');

const router = express.Router();

router.get('/', CitiesController.getList);
router.post('/', CitiesController.create);
router.patch('/:id', CitiesController.edit);

module.exports = router;
