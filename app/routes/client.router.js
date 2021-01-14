const express = require('express');
const router = express.Router();
const userCtrl = require('app/controllers/client.controller');
const auth = require("../middleware/auth");
const admin = require("../middleware/super_admin");

// routes Client
router.post('/register', userCtrl.registerClient);
router.get('/clients',  userCtrl.getAllClients);
router.get('/affiche/:id', userCtrl.getClientByIdAccount);
router.get('/client/:id',  userCtrl.getClient);
router.get('/verify', function (req, res) {
    console.log(req.protocol + ":/" + req.get('host'));
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");
        if (req.query.id == rand) {
            console.log("email is verified");
            res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
        }
        else {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else {
        res.end("<h1>Request is from unknown source");
    }
});
router.put('/update/:id',  userCtrl.updateClient);
router.delete('/delete/:id', [auth], userCtrl._delete);

module.exports = router;