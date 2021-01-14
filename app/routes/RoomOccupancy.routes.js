var express = require('express');
var router = express.Router();
var occupancies = require('../controllers/RoomOccupancy.controller');

router.get('/', occupancies.findAll);
router.post('/', occupancies.create);
router.get('/:id/one', occupancies.findOne);
router.put('/:id', occupancies.update);
router.delete('/:id', occupancies.delete);
router.get('/:idRoom', occupancies.findAllRoomOccupancy);
module.exports = router;
