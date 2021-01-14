const express = require('express');
const router = express.Router();
const cltAPICtrl = require('app/controllers/clientAPI.controller');
const auth = require("../middleware/auth");

//route admin api
router.post('/registerClientApi', cltAPICtrl.registerClientAPI);
router.get('/clientsapiaccepted', cltAPICtrl.getAllClientsApiAccepted);
router.get('/clientsapinotaccepted', cltAPICtrl.getAllClientsApiNotAccepted);
router.get('/clientapi',  cltAPICtrl.getClientApi);
router.post('/updateClientApi', [auth], cltAPICtrl.updateClientApi);
router.delete('/deleteClientApi', [auth], cltAPICtrl._deleteClientApi);

module.exports = router;