const smtpTransport = require('../config/configEmail');
const bcrypt = require('bcryptjs');
const User = require("../models/User.model");
const Agency = require("../models/Agency.model");
const Account = require("../models/Account.model");
const Role = require("../models/Role.model");
const ClientAgency = require("../models/ClientAgency.model");
/*******   fUNCTION OF SENDING MAIL FOR ACCOUNT'S VALIDATION  *********/
var rand, mailOptions, host, link;

function sendMailVerification(req, userParam) {

    // send mail
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link = "http://" + req.get('host') + "/verify?id=" + rand;
    mailOptions = {
        to: userParam.email,
        subject: "Please confirm your Email account",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            // res.send("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
}

/********************     CRUD Admin Agency     ********************/
exports.registerAdminAgency = (req, res, next) => {
    User.findOne({email: req.body.email}, function (err, result) {
        if (result) res.status(400).send('Email "' + req.body.email + '" is already taken');
    });

    Account.findOne({userName: req.body.userName}, function (err, result) {
        if (result) res.status(400).send('UserName "' + req.body.userName + '" is already taken');
    });

    Role.findOne({name: 'admin_agency'}, '_id', function (err, role) {
        if (!role) {
            //roleCtrl.addRole2();
            return res.status(400).send('Role not found');
        } else {
            const account = new Account(
                {
                    userName: req.body.userName,
                    password: bcrypt.hashSync(req.body.password, 10),
                    _role: role
                }
            );
            account.save();

            account.on('save', function (new_account) {
                console.log("Account's ID: " + new_account._id);

                Role.findOne({"_id": role}, function (errRole, result) {
                    if (errRole) return res.status(500).send(errRole.message && "Role not found.");
                    else if (!err && result) {
                        result._acounts.push(new_account._id); // update ur values goes here
                        var nvrole = new Role(result);
                        nvrole.save();
                    }
                });

                // save user
                const user = new User(
                    {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        phone: req.body.phone,
                        _account: new_account._id
                    }
                );
                user.save();
                sendMailVerification(req, req.body);
                user.on('save', function (new_user) {
                    console.log("User's ID: " + new_user._id);
                    const agency = new Agency(
                        {
                            code: req.body.code,
                            name: req.body.name,
                            webSite: req.body.webSite,
                            marginAction: req.body.marginAction,
                            margin: req.body.margin,
                            marginUnity: req.body.marginUnity,
                            fax: req.body.fax,
                            emailAgency: req.body.emailAgency,
                            phoneAgency: req.body.phoneAgency
                        });
                    agency.save();
                    agency.on('save', function (new_agency) {
                        console.log("Agency's ID: " + new_agency._id);
                        const admin_agency = new ClientAgency(
                            {
                                agency: new_agency._id,
                                _user: new_user._id
                            });
                        admin_agency.save()
                            .then(() => res.json({
                                status: "200",
                                message: "succes"
                            }))
                            .catch(err => next(err));
                    });
                });
            });
        }
    });
};

exports.getAllAdminAgencyNotAccepted = (req, res, next) => {
    /* listes des comptes du type **client** */
    Role.findOne({name: 'admin_agency'}).populate('_acounts').exec((err, accountsRole) => {

        if (!accountsRole) return res.status(400).send('Accounts not found.');
        var usersListe, accounts, listeClientsAgency, finalList = [];
        /****** affecter la liste des comptes dans un array *****/
        accounts = accountsRole._acounts;

        /* listes des users */
        User.find().exec((err, users) => {
            if (!users) return res.status(400).send('Invalid Admin Agency.');
            /****** affecter la liste des users dans un array *****/
            usersListe = users;

            /* listes des clients */
            ClientAgency.find().populate('agency').exec((err, clients) => {
                if (!clients) return res.status(400).send('Invalid clients Agency.');
                /****** affecter la liste des clients dans un array *****/
                listeClientsAgency = clients;

                var item;
                accounts.every(function (value) {
                    console.log(value._id);
                    usersListe.every(function (user) {
                        if (value._id.equals(user._account)) {
                            listeClientsAgency.every(function (adminagency) {
                                let current = adminagency
                                if (!current.accepted) {
                                    if (adminagency._user.equals(user._id)) {
                                        item = {
                                            user: user,
                                            adminagency: adminagency
                                        };
                                        finalList.push(item);

                                        return false;
                                    }
                                }

                                return true;
                            });
                        }
                        return true;
                    });
                    return true;
                });
                res.send(finalList);
            });
        });
    });
};

exports.getAllAdminAgencyAccepted = (req, res, next) => {
    /* listes des comptes du type **client** */
    Role.findOne({name: 'admin_agency'}).populate('_acounts').exec((err, accountsRole) => {

        if (!accountsRole) return res.status(400).send('Accounts not found.');
        var usersListe, accounts, listeClientsAgency, finalList = [];
        /****** affecter la liste des comptes dans un array *****/
        accounts = accountsRole._acounts;

        /* listes des users */
        User.find().exec((err, users) => {
            if (!users) return res.status(400).send('Invalid Admin Agency.');
            /****** affecter la liste des users dans un array *****/
            usersListe = users;

            /* listes des clients */
            ClientAgency.find().populate('agency').exec((err, clients) => {
                if (!clients) return res.status(400).send('Invalid clients Agency.');
                /****** affecter la liste des clients dans un array *****/
                listeClientsAgency = clients;

                var item;
                accounts.every(function (value) {
                    console.log(value._id);
                    usersListe.every(function (user) {
                        if (value._id.equals(user._account)) {
                            listeClientsAgency.every(function (adminagency) {
                                if (adminagency.accepted) {
                                    if (adminagency._user.equals(user._id)) {

                                        item = {
                                            user: user,
                                            adminagency: adminagency,
                                        };
                                        finalList.push(item);

                                        return false;
                                    }
                                }
                                return true;
                            });
                        }
                        return true;
                    });
                    return true;
                });
                res.send(finalList);
            });
        });
    });
};

exports.getAdminAgency = function (req, res, next) {
    /****get the data of the client object  ****/
    ClientAgency.findById(req.params.id)
        .populate('agency')
        .populate('_user')
        .exec((err, adminagency) => {
            if (err) {
                res.json({
                    error: err
                })
            }
            /***** get the data of the account object *****/
            Account.findById(adminagency._user._account, function (err, account) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                res.json({
                    adminagency: adminagency,
                    account: account,
                    password: bcrypt.compare(account.password)
                })
            })
        })
};

exports.updateAdminAgency = (req, res) => {

    User.findOne({email: req.body.email}, function (err, result) {
        if (result) res.status(400).send('Email "' + req.body.email + '" is already taken');
    });

    // Find Admin Agency and update it with the request body
    ClientAgency.findByIdAndUpdate(req.params.id, {
        agency: req.body.agency
    }, {new: true})
        .then(ClientAgency => {

            if (!ClientAgency) {
                return res.status(404).send({
                    message: "Admin Agency not found with id " + req.params.id
                });
            }
            // Find user and update it with the request body
            User.findByIdAndUpdate(ClientAgency._user, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone
            }, {new: true})
                .then(user => {
                    if (!user) {
                        return res.status(404).send({
                            message: "User not found with id " + ClientAgency._user
                        });
                    }
                    res.send({
                        ClientAgency: ClientAgency,
                        User: user
                    });
                })
                .catch(err => {
                    return res.status(500).send({
                        message: err
                    });
                });
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Admin Agency not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating Admin Agency with id " + req.params.id
        });
    });
};

exports._deleteAdminAgency = (req, res, next) => {
    ClientAgency.findByIdAndRemove(req.params.id)
        .then(adminag => {
            if (!adminag) {
                return res.status(404).send({
                    message: "Cient not found with id " + req.params.id
                });
            }
            var idUser = adminag._user;
            User.findByIdAndRemove(idUser)
                .then(user => {
                    if (!user) {
                        return res.status(404).send({
                            message: "User not found with id " + idUser
                        });
                    }
                    var idAccount = user._account;
                    Account.findByIdAndRemove(idAccount)
                        .then(account => {
                            if (!account) {
                                return res.status(404).send({
                                    message: "Account not found with id " + idAccount
                                });
                            }
                        }).catch(err => {
                        return res.send({
                            message: err
                        });
                    });
                }).catch(err => {
                return res.send({
                    message: err
                });
            });
            res.send({message: "Admin Agency deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Admin Agency not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete Admin Agency with id " + req.params.id
        });
    });
};

exports.acceptAdminAgency = (req, res) => {

    ClientAgency.findByIdAndUpdate(req.params.id, {
        accepted: true
    }, {new: true})
        .then(ClientAgency => {

            if (!ClientAgency) {
                return res.status(404).send({
                    message: "Admin Agency not found with id " + req.params.id
                });
            }
            res.send(ClientAgency);

        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Admin Agency not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error accepting Admin Agency with id " + req.params.id
        });
    });
};
