const express = require('express');
const SuggestionsController = require('../controllers/suggestions.controller');

const router = express.Router();

router.get('/', SuggestionsController.getList);
router.post('/', SuggestionsController.create);
router.patch('/:id', SuggestionsController.edit);
router.delete('/:id', SuggestionsController.delete);

module.exports = router;
