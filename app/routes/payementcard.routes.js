const express = require('express')

//pour montrer que ce fichier est un fichier de routage
const router = express.Router();

const CardController = require('../controllers/PayementCard.controller')
router.post('/', CardController.create)
router.get('/:id', CardController.findOne)
router.put('/:id', CardController.update)
router.delete('/:id', CardController.delete)
router.get('/', CardController.findAll)
module.exports = router

