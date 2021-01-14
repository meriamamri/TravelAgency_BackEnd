const express = require('express');
const router = express.Router();
const ProductFacilityTypeController = require('../controllers/ProductFacilityType.controller');

//roots
router.get('/', ProductFacilityTypeController.findAllTypes);
router.get('/all', ProductFacilityTypeController.findAll);
router.post('/addType', ProductFacilityTypeController.createTypeProductFacility);
router.get('/:id', ProductFacilityTypeController.findOne);
router.put('/update/:id', ProductFacilityTypeController.update);
router.delete('/delete/:id', ProductFacilityTypeController.delete);

module.exports=router;

