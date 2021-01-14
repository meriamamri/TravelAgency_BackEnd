const express = require('express')

//pour montrer que ce fichier est un fichier de routage
const router = express.Router();

const ProductController = require('../controllers/Product.controller')


router.get('/', ProductController.findAll)
router.post('/add', ProductController.create)
router.get('/:id', ProductController.findOne)
router.put('/update/:id', ProductController.update)
router.delete('/delete/:id', ProductController.delete)

module.exports=router

