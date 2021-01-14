const smtpTransport = require('../config/configEmail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../models/User.model");
const Client = require("../models/Client.model");
const Account = require("../models/Account.model");
const Role = require("../models/Role.model");
const roleCtrl = require('app/controllers/roles.controller');


/* roleCtrl.addRole1();
roleCtrl.addRole2();
roleCtrl.addRole3();
roleCtrl.addRole4();
roleCtrl.addRole5(); */

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
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
}

/********************     CRUD Client         ************************/

exports.registerClient = (req, res, next) => {
    // validate
    if ( User.findOne({email: req.body.email})) {
        return res.status(400).send('Email "' + req.body.email + '" is already taken');
    }

    if ( Account.findOne({userName: req.body.userName})) {
        return res.status(400).send('UserName "' + req.body.userName + '" is already taken');
    }

    Role.findOne({name: 'client'}, '_id', function (err, role) {
        if (!role) {
            //roleCtrl.addRole5();
            return res.status(400).send('Role not found');
        }
        else {
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

                Role.findOne({"_id": role}, function (err, result) {
                    if (!err && result) {
                        result._acounts.push(new_account._id); // update ur values goes here
                        var nvrole = new Role(result);
                        nvrole.save();
                    } else console.log(err);
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
                    // save client
                    const client = new Client(
                        {
                            birthday: req.body.birthday,
                            cinOrPassport: req.body.cinOrPassport,
                            nationality: req.body.nationality,
                            _user: new_user._id
                        }
                    );
                    client.save()
                        .then(() => res.json({
                            message: "succes",
                            id: client._id
                        }))
                        .catch(err => next(err));
                });
            });
        }
    });
};

exports.getAllClients =  (req, res, next) => {
    /* listes des comptes du type **client** */
     Role.findOne({name: 'client'}).populate('_acounts').exec((err, accountsRole) => {

        if (!accountsRole) return res.status(400).send('Acconts not found.');
        var usersListe, accounts, listeClients, finalList = [];
        /****** affecter la liste des comptes dans un array *****/
        accounts = accountsRole._acounts;

        /* listes des users */
        User.find().exec((err, users) => {
            if (!users) return res.status(400).send('users not found..');
            /****** affecter la liste des users dans un array *****/
            usersListe = users;

            /* listes des clients */
            Client.find().exec((err, clients) => {
                if (!clients) return res.status(400).send('clients not found.');
                /****** affecter la liste des clients dans un array *****/
                listeClients = clients;

                var item;
                accounts.every(function (account) {
                    console.log(account._id);
                    usersListe.every(function (user) {
                        if (account._id.equals(user._account)) {
                            listeClients.every(function (client) {
                                if (client._user.equals(user._id)) {
                                    item = {
                                        user: user,
                                        client: client
                                    };
                                    return false;
                                }
                                return true;
                            });
                            finalList.push(item);
                            /*Client.findOne({_user: user._id}).exec((err, client) => {
                                if (!client) return res.status(400).send('Invalid client.');
                                listeClients.push(client);
                            });*/
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

exports.getClient = function (req, res, next) {
    /****get the data of the client object  ****/
    Client.findById(req.params.id, function (err, client) {
        if (err) {
            res.json({
                error: err
            })
        }
        /***** get the data of the user ogject *****/
        /***** get the data of the user ogject *****/
        User.findOne({_id: client._user}, function (err, user) {
            if (err) {
                res.json({
                    error: err
                })
            }
            res.json({
                client: client,
                user: user
            })
        })
    })
};

exports.updateClient =  (req, res) => {

    /*if ( User.findOne({email: req.params.email})) {
        return res.status(400).send('Email "' + req.params.email + '" is already taken');
    }*/
    // Find Client and update it with the request body
    Client.findByIdAndUpdate(req.params.idClient, {
        birthday: req.body.birthday,
        cinOrPassport: req.body.cinOrPassport,
        nationality: req.body.nationality
    }, {new: true})
        .then(Client => {
            if (!Client) {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.idClient
                });
            }
            // Find user and update it with the request body
            User.findByIdAndUpdate(Client._user, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone
            }, {new: true})
                .then(user => {
                    if (!user) {
                        return res.status(404).send({
                            message: "User not found with id " + Client._user
                        });
                    }
                    res.send({
                        Client: Client,
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
                message: "Client not found with id " + req.params.idClient
            });
        }
        return res.status(500).send({
            message: "Error updating Client with id " + req.params.idClient
        });
    });
};

exports._delete = (req, res, next) => {
    Client.findByIdAndRemove(req.params.id)
        .then(client => {
            if (!client) {
                return res.status(404).send({
                    message: "Cient not found with id " + req.params.id
                });
            }
            var idUser = client._user;
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
            res.send({message: "Client deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Cient not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete Product with id " + req.params.id
        });
    });
};

// Find a single Client By id Account
exports.getClientByIdAccount = function (req, res, next) {
    console.log(req.params.id);
    User.findOne({_account: req.params.id})
        .then(User => {
            if (!User) {
                return res.status(404).send({
                    message: " User found with id " + req.params.id
                });
            }

            Client.findOne({_user: User._id})
                .then(Client => {
                    if (!Client) {
                        return res.status(404).send({
                            message: " Client found with id " + User._id
                        });
                    }
                    res.send({
                        user: User,
                        client: Client
                    });
                })
                .catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Client not found with id " + User._id
                        });
                    }
                    return res.status(500).send({
                        message: "Error retrieving Client with id " + User._id
                    });
                });
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
        });
    });
};

















