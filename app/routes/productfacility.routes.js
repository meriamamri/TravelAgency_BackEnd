var express = require('express');
var router = express.Router();
const ProductFacilityController = require('../controllers/ProductFacility.controller');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
var estabservicecategory = require('../models/EstabServiceCategory.model')

//roots
router.get('/', ProductFacilityController.findAll);
router.post('/add', ProductFacilityController.create);
router.get('/:id', ProductFacilityController.findOne);
router.put('/update/:id', ProductFacilityController.update);
router.delete('/delete/:id', ProductFacilityController.delete);
router.get('/facility/:id', ProductFacilityController.findOneFacility)

module.exports=router;

const storage = multer.diskStorage({
    destination: function(req , file , cb) {
        //  const uploadsDir= path.join(__dirname , '..' , '..', 'public', 'uploads' , `${ Date.now() }`);
        // fs.mkdirSync(uploadsDir)
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null ,file.originalname );
    }
});
const fileFilter = (req, file, cb ) => {
    if (file.mimetype === 'image/jpeg' ||  file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb (null , true);
    } else {
        cb(null, false);
    }
};
const upload = multer ({
    storage:storage ,
    limits: { fileSize: 1024 * 1024 * 5 } ,
    fileFilter : fileFilter
});

