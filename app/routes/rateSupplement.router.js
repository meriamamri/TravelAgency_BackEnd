var express = require ('express')
var router = express.Router();
const rateSupplementController = require('../controllers/rateSupplement.controller')
router.get('/:id', rateSupplementController.findAllRateSupplement);
router.post('/add', rateSupplementController.AddSupplement);
router.put('/update/:id', rateSupplementController.UpdateSupplement);
router.get('/:id/one', rateSupplementController.getRateSupplement);
router.delete('/:id', rateSupplementController.delete);
module.exports=router