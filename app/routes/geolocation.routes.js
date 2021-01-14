var express = require('express');
var router = express.Router();
var geolocation = require('../controllers/geolocation.controller.js');

router.get('/', geolocation.findAll);
router.post('/', geolocation.create);
router.get('/:id', geolocation.findOne);
router.put('/:id', geolocation.update);
router.delete('/:id', geolocation.delete);


module.exports = router;