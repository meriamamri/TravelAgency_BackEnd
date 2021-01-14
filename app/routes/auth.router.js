const express = require('express');
const router = express.Router();
const authCtrl = require('app/controllers/auth.controller');
const auth = require("../middleware/auth");

router.post('/authenticate', authCtrl.authenticate);
router.post('/password',[auth], authCtrl.updatePassword);

module.exports = router;