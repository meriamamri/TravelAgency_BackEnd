const express = require('express')

//pour montrer que ce fichier est un fichier de routage
const router = express.Router();

const DescriptionController = require('../controllers/Description.controller')


router.get('/', DescriptionController.findAll)
router.post('/', DescriptionController.create)
router.get('/:id', DescriptionController.findOne)
router.put('/update/:id', DescriptionController.update)
router.delete('/delete/:id', DescriptionController.delete)

module.exports=router

