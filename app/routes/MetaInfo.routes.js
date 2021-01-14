const express = require('express')


const router = express.Router();

const metaController = require('../controllers/meta.controller')


router.get('/', metaController.findAll)
router.post('/add', metaController.create)
router.get('/:id', metaController.findOne)
router.put('/update/:id', metaController.update)
router.delete('/delete/:id', metaController.delete)

module.exports=router

