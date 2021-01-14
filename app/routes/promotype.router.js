var express = require('express');
var router = express.Router();
const promotypeCtrl = require('../controllers/RatePromotionType.controller');
var promotype = require('../models/RatePromotionType.model') ;

router.post('/add' ,promotypeCtrl.create);
router.get( '/all', promotypeCtrl.findAll );
router.put( '/update/:id', promotypeCtrl.update );
router.delete( '/delete/:id', promotypeCtrl.delete );
module.exports = router;