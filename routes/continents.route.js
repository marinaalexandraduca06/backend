const express = require('express');
const ContinentsController = require('../controllers/continents.controller');

const router = express.Router();

router.get('/', ContinentsController.getList);
router.post('/', ContinentsController.create);

module.exports = router;
