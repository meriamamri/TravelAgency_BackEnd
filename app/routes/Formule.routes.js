const express = require('express')
const router = express.Router();
const RepasCtr = require('../controllers/FormuleRepas.controller');
const BoissonsCtr = require('../controllers/FormuleBoisson.controller');

// formule repas roots
router.post('/addRepas', RepasCtr.create);
router.get('/repas',RepasCtr.findAll);
//router.get('/:id', RepasCtr.findOne)
router.put('/updateRepas/:id', RepasCtr.update)
router.delete('/deleteRepas/:id', RepasCtr.delete)
// formule repas roots
router.post('/addboisson', BoissonsCtr.create);
router.get('/boissons',BoissonsCtr.findAll);
//router.get('/:id', BoissonsCtr.findOne)
router.put('/updateboisson/:id', BoissonsCtr.update)
router.delete('/deleteboisson/:id', BoissonsCtr.delete)
module.exports=router
