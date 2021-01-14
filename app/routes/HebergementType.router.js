const express = require('express');
const router = express.Router();
const HebergementTypeController = require('../controllers/HebergementType.controller');

//roots
    router.get('/', HebergementTypeController.findAllTypes);
    router.post('/add', HebergementTypeController.createHebergementType);
    router.get('/:id', HebergementTypeController.findOne);
    router.put('/update/:id', HebergementTypeController.update);
    router.delete('/delete/:id', HebergementTypeController.delete);

module.exports=router;

