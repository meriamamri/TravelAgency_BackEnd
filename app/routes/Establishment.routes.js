const express = require('express')

//pour montrer que ce fichier est un fichier de routage
const router = express.Router();
//importer le controleur de l'employé
const estabController = require('../controllers/establishment.controller')

//Employee routes
router.get('/', estabController.findAll)
router.post('/add', estabController.create)
router.get('/:id', estabController.findOne)
router.put('/update/:id', estabController.update)
router.put('/translationAr/:id', estabController.translationAr)
router.delete('/delete/:id', estabController.delete)
router.get('/contacts/:estabId', estabController.findContactsByEstabId);
router.get('/conditions/:estabId', estabController.findConditionsByEstabId);
router.post('/addMetaInfo/:id',estabController.newEstabMetaInfo)
router.post('/addGeolocation/:id',estabController.newEstabGeolocation)
router.post('/addAdress/:id',estabController.newEstabAdress)
router.post('/addRestruction/:id',estabController.newEstabrestruction)
router.post('/addCondition/:id',estabController.newEstabCondition)
router.post('/addImage/:id',estabController.newEstabImage)
router.post('/addService/:id',estabController.newEstabService)
router.post('/addPayMethod/:id',estabController.newEstabPayMethod)
router.post('/addContact/:id',estabController.newEstabContact)
router.post('/addSocialConnection/:id',estabController.newEstabSocialConnection)
module.exports=router

