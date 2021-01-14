var express = require('express');
var router = express.Router();
const RatePromo = require('../controllers/RatePromotion.controller');
var ratepromotion = require('../models/RatePromotion.model');

router.get( '/:id', RatePromo.PromoType );
router.post( '/add', RatePromo.create );

module.exports = router;