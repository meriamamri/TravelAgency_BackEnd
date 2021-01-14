var express = require('express');
var router = express.Router();
const Marge = require('../controllers/Marge.controller');

router.get( '/all', Marge.findAllMarge );
router.post( '/add', Marge.create );

module.exports = router;