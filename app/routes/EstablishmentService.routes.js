const express = require('express')
const router = express.Router();
const servicectrl = require('../controllers/EstablishmentService.controller');

//rootes of chaine
router.post('/add', servicectrl.create);
router.get('/',servicectrl.findAll);
router.get('/service/:id', servicectrl.findOne);
router.put('/update/:id', servicectrl.update);
router.delete('/:id', servicectrl.delete);
router.get('/category/:id' ,servicectrl.findOneService);
module.exports=router