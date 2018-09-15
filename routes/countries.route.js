const express = require('express');
const CountriesController = require('../controllers/countries.controller');

const router = express.Router();

router.get('/', CountriesController.getList);
router.post('/', CountriesController.create);

module.exports = router;
