var express = require('express');
var router = express.Router();
const CategCrls = require('../controllers/EstabServiceCategory.controller');
var estabservicecategory = require('../models/EstabServiceCategory.model')
 //rootes of establishment type
router.post('/add' ,CategCrls.create);
router.get( '/all', CategCrls.findAll );
router.get( '/', CategCrls.getAll );
router.get( '/:id', CategCrls.ServiceCategorie );
router.get( '/service/:id', CategCrls.findOne );
router.post( '/:id/services', CategCrls.newServiceCategorie );
router.put('/update/:id', CategCrls.update);
router.delete('/delete/:id', CategCrls.delete);
module.exports = router;
//var express = require('express');
//var router = express.Router();


//router.get('/', estabType.findAll);
//router.post('/add', estabType.create);
//router.get('/:id', estabType.findOne);
//router.put('/update/:id', estabType.update);
//router.delete('/:id', estabType.delete);


//module.exports = router;