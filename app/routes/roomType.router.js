const express = require('express');
const router = express.Router();
const roomTypeController = require('../controllers/roomType.controller');

//roots
router.post('/add', roomTypeController.createRoomType);
router.get('/:id', roomTypeController.findAllRoomTypesByProductID);
router.get('/one/:id', roomTypeController.findRoomTypeByID);
router.put('/update/:id', roomTypeController.update);
router.delete('/delete/:id', roomTypeController.delete);
router.put('/addFacilities/:id', roomTypeController.addFacilities);
router.post('/addOccupancy/:id', roomTypeController.newRoomTypeOccupancy);
router.get('/occupancies/:id', roomTypeController.findAllOccupancy);

module.exports=router;

