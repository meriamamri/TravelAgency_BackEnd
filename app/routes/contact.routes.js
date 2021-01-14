var express = require('express');
var router = express.Router();
var contacts = require('../controllers/Contact.controller.js');

router.get('/', contacts.findAll);
router.post('/', contacts.create);
router.get('/:id', contacts.findOne);
router.put('/:id', contacts.update);
router.delete('/:id', contacts.delete);
router.get('/establishment/:estabId', contacts.findByEstabId);
module.exports = router;