const express = require('express')

//pour montrer que ce fichier est un fichier de routage
const router = express.Router();
//importer le controleur de l'employé
const conditionController = require('../controllers/EstabCondition.controller')

//Employee routes
router.get('/', conditionController.findAll)
router.post('/', conditionController.create)
router.get('/:id', conditionController.findOne)
router.put('/update/:id', conditionController.update)
router.delete('/:id', conditionController.delete)
router.get('/descriptions/:condId', conditionController.findDescriptionsByConditionId)


module.exports=router

