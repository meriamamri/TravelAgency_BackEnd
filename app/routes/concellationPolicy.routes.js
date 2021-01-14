var express = require('express');
var router = express.Router();
var ConcellationPolicy = require('../controllers/concellationPolicy.controller');

router.post('/add', ConcellationPolicy.create);
router.get('/All', ConcellationPolicy.findAll);
router.get('/:id', ConcellationPolicy.findOne);
router.put('/update/:id', ConcellationPolicy.update);
router.delete('/delete/:id', ConcellationPolicy.delete);
module.exports = router;