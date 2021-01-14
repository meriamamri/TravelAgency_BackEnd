const express = require('express')

//pour montrer que ce fichier est un fichier de routage
const router = express.Router();

const LanguageController = require('../controllers/Language.controller')


router.get('/', LanguageController.findAll)
router.post('/add', LanguageController.create)
router.get('/:id', LanguageController.findOne)
router.put('/update/:id', LanguageController.update)
router.delete('/delete/:id', LanguageController.delete)

module.exports=router

