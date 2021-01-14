const express = require('express');
const router = express.Router();
const agencyDepositCrl = require('app/controllers/AgencyDeposit.controller');

//route admin Agency
router.post('/add', agencyDepositCrl.createDeposit);
router.get('/:id/all', agencyDepositCrl.findAllDepositByAgencyID);
router.delete('/:id/delete', agencyDepositCrl.delete);

module.exports = router;
