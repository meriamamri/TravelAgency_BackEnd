var express = require('express');
var router = express.Router();
var countries = require('../controllers/Country.controller.js');

router.get('/', countries.findAll);
router.post('/', countries.create);
router.post('/:id', countries.newCountryCity);
router.get('/:id', countries.findOne);
router.put('/:id', countries.update);
router.delete('/:id', countries.delete);
module.exports = router;