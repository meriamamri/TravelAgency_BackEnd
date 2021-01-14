var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('Hello E_Tourism Project #INDAFRI #SRSolutions 2019');
});

module.exports = router;
