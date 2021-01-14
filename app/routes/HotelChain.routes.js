var express = require('express');
var router = express.Router();
var hotelChain = require('../controllers/HotelChain.controller');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
var hotelChain = require('../controllers/HotelChain.controller');
router.post("/", hotelChain.create)
router.get('/all', hotelChain.findAll);
router.get('/', hotelChain.getAll);
//router.post('/', );
router.get('/:id', hotelChain.findOne);
router.put('/:id', hotelChain.update);
router.delete('/:id', hotelChain.delete);
module.exports = router;
