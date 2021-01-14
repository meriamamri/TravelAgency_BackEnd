var express = require ('express')
var router = express.Router();
const ratetypeController = require('../controllers/rateType.controller')

router.post('/add', ratetypeController.Create);
router.get('/:id', ratetypeController.findAllRoomRateTypes);
router.get('/all/:id', ratetypeController.findAllRateTypesOfRooms);
router.get('/:id/one', ratetypeController.findOne);
router.delete('/:id', ratetypeController.delete);
router.put('/update/:id', ratetypeController.updateRateTape);

module.exports=router