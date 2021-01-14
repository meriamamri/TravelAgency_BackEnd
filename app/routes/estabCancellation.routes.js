const express = require('express')

//pour montrer que ce fichier est un fichier de routage
const router = express.Router();

const CancellationController = require('../controllers/estabCancellation.controller')


router.get('/', CancellationController.findAll)
router.post('/', CancellationController.create)
router.get('/:id', CancellationController.findOne)
router.put('/:id', CancellationController.update)
router.delete('/:id', CancellationController.delete)

module.exports=router

