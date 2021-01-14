const express = require('express');
const router = express.Router();
const adminCtrl = require('app/controllers/superAdmin.controller');
const auth = require("../middleware/auth");

//route Super admin
router.post('/registerSuperAdmin', adminCtrl.registerSuperAdmin);
router.post('/updateSuperAdmin', [auth], adminCtrl.updateSuperAdmin);

module.exports = router;