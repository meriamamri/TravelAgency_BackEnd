var express = require('express');
var router = express.Router();
var adresses = require('../controllers/Adress.controller');
	
router.get('/',adresses.findAll);
router.post('/',  adresses.create);
router.get('/:id', adresses.findOne);
router.put('/:id', adresses.update);
router.delete('/:id',adresses.delete);
router.get('/findByDestinationId/:id', adresses.findAll);
module.exports = router;