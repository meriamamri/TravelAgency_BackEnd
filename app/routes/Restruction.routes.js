const express = require('express')

//pour montrer que ce fichier est un fichier de routage
const router = express.Router();

const RestructionController = require('../controllers/Restruction.controller')


router.get('/', RestructionController.findAll)
router.post('/add', RestructionController.create)
router.get('/:id', RestructionController.findOne)
router.put('/update/:id', RestructionController.update)
router.delete('/delete/:id', RestructionController.delete)

module.exports=router

