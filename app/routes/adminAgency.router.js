const express = require('express');
const router = express.Router();
const adminAgencyCrl = require('app/controllers/adminAgency.controller');
const auth = require("../middleware/auth");

//route admin Agency
router.post('/registerAdminAgency', adminAgencyCrl.registerAdminAgency);
router.get('/adminsAgencyAccepted', adminAgencyCrl.getAllAdminAgencyAccepted);
router.get('/adminsAgencyNotAccepted', adminAgencyCrl.getAllAdminAgencyNotAccepted);
router.get('/adminAgency/:id',  adminAgencyCrl.getAdminAgency);
router.put('/updateAdminAgency/:id',  adminAgencyCrl.updateAdminAgency);
router.put('/accept/:id',  adminAgencyCrl.acceptAdminAgency);
router.delete('/deleteAdminAgency/:id', adminAgencyCrl._deleteAdminAgency);

module.exports = router;