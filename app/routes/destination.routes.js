var express = require('express');
var router = express.Router();
var cities = require('../controllers/City.controller.js');

router.get('/', cities.findAll);
router.post('/', cities.create);
router.get('/:id', cities.findOne);
router.put('/:id', cities.update);
router.delete('/:id', cities.delete);
router.post('/:id', cities.newDestinationAdress);
router.get('/findByCountryId/:id', cities.findByCountryId);
module.exports = router;