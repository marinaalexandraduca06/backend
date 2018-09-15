const express = require('express');
const DestionationsController = require('../controllers/destinations.controller');

const router = express.Router();

router.get('/', DestionationsController.getList);
router.post('/', DestionationsController.create);
router.delete('/:id', DestionationsController.delete);

module.exports = router;
