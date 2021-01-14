var express = require('express');
var router = express.Router();
var estabType = require('../controllers/EstablishmentType.controller');

router.get('/', estabType.findAll);
router.post('/add', estabType.create);
router.get('/:id', estabType.findOne);
router.put('/update/:id', estabType.update);
router.delete('/:id', estabType.delete);


module.exports = router;