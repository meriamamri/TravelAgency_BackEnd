const express = require('express');
const router = express.Router();
const CurrencyController = require('../controllers/Currency.controller');
router.get('/', CurrencyController.findAll)
router.post('/addCurrency', CurrencyController.create)
router.get('/:id', CurrencyController.findOne)
router.put('/update/:id', CurrencyController.update)
router.delete('/delete/:id', CurrencyController.delete)

module.exports=router

