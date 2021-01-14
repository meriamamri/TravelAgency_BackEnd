const express = require('express');
const router = express.Router();
const agentAgencyCtrl = require('app/controllers/agentAgency.controller');
const auth = require("../middleware/auth");

//route agent agency
router.post('/registerAgentAgency', agentAgencyCtrl.registerAgentAgency);
router.post('/updateAgent', [auth], agentAgencyCtrl.updateAgent);
router.delete('/deleteAgent', [auth], agentAgencyCtrl._deleteAgent);
router.get('/agent', [auth], agentAgencyCtrl.getAgent);
router.get('/agents', [auth], agentAgencyCtrl.getAllAgents);


module.exports = router;