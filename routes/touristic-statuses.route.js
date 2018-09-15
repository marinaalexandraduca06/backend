const express = require('express');
const TouristicStatusesController = require('../controllers/touristic-statuses.controller');

const router = express.Router();

router.get('/', TouristicStatusesController.getList);
router.post('/', TouristicStatusesController.create);
router.patch('/:id', TouristicStatusesController.edit);

module.exports = router;
