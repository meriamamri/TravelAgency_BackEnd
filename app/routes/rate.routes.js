var express = require ('express')
var router = express.Router();
const rateController = require('../controllers/rate.controller');

router.post('/add', rateController.create);
router.get('/all/:id', rateController.findAllRate);
router.put('/update/:id', rateController.update);
router.delete('/delete/:id', rateController.delete);
router.get('/one/:id', rateController.getOneRate);

module.exports=router