const smtpTransport = require('../config/configEmail');
const bcrypt = require('bcryptjs');
const User = require("../models/User.model");
const Account = require("../models/Account.model");
const Role = require("../models/Role.model");
const ClientApi = require("../models/ClientApi.model");
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

/********************     CRUD Client API    **********************/
exports.registerClientAPI =  (req, res, next) => {
    // validate
    if ( User.findOne({email: req.body.email})) {
        return res.status(400).send('Email "' + req.body.email + '" is already taken');
    }

    if ( Account.findOne({userName: req.body.userName})) {
        return res.status(400).send('UserName "' + req.body.userName + '" is already taken');
    }

    Role.findOne({name: 'client_api'}, '_id', function (err, role) {
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
                    // save clientapi
                    const clientapi = new ClientApi(
                        {
                            name_company: req.body.name_company,
                            nationality: req.body.nationality,
                            _user: new_user
                        }
                    );
                    clientapi.save()
                        .then(() => res.json({
                            message: "succes",
                            id: clientapi._id
                        }))
                        .catch(err => next(err));
                });
            });
        }
    });
};

exports.getAllClientsApiNotAccepted =  (req, res, next) => {
    /* listes des comptes du type **client** */
     Role.findOne({name: 'client_api'}).populate('_acounts').exec((err, accountsRole) => {

        if (!accountsRole) return res.status(400).send('Accounts not found.');
        var usersListe, accounts, listeClientsApi, finalList = [];
        /****** affecter la liste des comptes dans un array *****/
        accounts = accountsRole._acounts;

        /* listes des users */
        User.find().exec((err, users) => {
            if (!users) return res.status(400).send('Invalid users.');
            /****** affecter la liste des users dans un array *****/
            usersListe = users;

            /* listes des clients */
            ClientApi.find().exec((err, clientsApi) => {
                if (!clientsApi) return res.status(400).send('Invalid clients Api.');
                /****** affecter la liste des clients dans un array *****/
                listeClientsApi = clientsApi;

                var item;
                accounts.every(function (value) {
                    console.log(value._id);
                    usersListe.every(function (user) {
                        if (value._id.equals(user._account)) {
                            listeClientsApi.every(function (clientap) {
                                let current = clientap;
                                if (!current.accepted) {
                                    if (clientap._user.equals(user._id)) {
                                        item = {
                                            user: user,
                                            clientap: clientap
                                        };
                                        return false;
                                    }
                                }

                                return true;
                            });
                            // console.log(item);
                            finalList.push(item);
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

exports.getAllClientsApiAccepted =  (req, res, next) => {
    /* listes des comptes du type **client** */
     Role.findOne({name: 'client_api'}).populate('_acounts').exec((err, accountsRole) => {

        if (!accountsRole) return res.status(400).send('Accounts not found.');
        var usersListe, accounts, listeClientsApi, finalList = [];
        /****** affecter la liste des comptes dans un array *****/
        accounts = accountsRole._acounts;

        /* listes des users */
        User.find().exec((err, users) => {
            if (!users) return res.status(400).send('Invalid users.');
            /****** affecter la liste des users dans un array *****/
            usersListe = users;

            /* listes des clients */
            ClientApi.find().exec((err, clientsApi) => {
                if (!clientsApi) return res.status(400).send('Invalid clients Api.');
                console.log(clientsApi);
                /****** affecter la liste des clients dans un array *****/
                listeClientsApi = clientsApi;

                accounts.every(function (value) {
                    console.log(value._id);
                    usersListe.every(function (user) {
                        if (value._id.equals(user._account)) {
                            listeClientsApi.every(function (clientap) {
                                if (clientap.accepted == true) {
                                    if (clientap._user.equals(user._id)) {
                                        var item = {
                                            user: user,
                                            clientap: clientap
                                        };
                                        finalList.push(item);
                                        return false;
                                    }
                                }
                                console.log(item);
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

exports.getClientApi = function (req, res, next) {
    /****get the data of the client object  ****/
    ClientApi.findById(req.body.id, function (err, clientapi) {
        if (err) {
            res.json({
                error: err
            })
        }
        /***** get the data of the user ogject *****/
        User.findOne({_id: clientapi._user}, function (err, user) {
            if (err) {
                res.json({
                    error: err
                })
            }
            res.json({
                clientapi: clientapi,
                user: user
            })
        })
    })
};

exports.updateClientApi =  (req, res) => {

    if ( !req.body.idClientApi) {
        return res.status(400).send({
            message: "ClientApi id can not be empty"
        });
    }

    if ( User.findOne({email: req.body.email})) {
        return res.status(400).send('Email "' + req.body.email + '" is already taken');
    }
    // Find Client and update it with the request body
    ClientApi.findByIdAndUpdate(req.body.idClientApi, {
        name_company: req.body.name_company,
        nationality: req.body.nationality
    }, {new: true})
        .then(ClientApi => {
            if (!ClientApi) {
                return res.status(404).send({
                    message: "Client Api not found with id " + req.body.idClientApi
                });
            }
            // Find user and update it with the request body
            User.findByIdAndUpdate(ClientApi._user, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone
            }, {new: true})
                .then(user => {
                    if (!user) {
                        return res.status(404).send({
                            message: "User not found with id " + ClientApi._user
                        });
                    }
                    res.send({
                        ClientApi: ClientApi,
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
                message: "Client Api not found with id " + req.body.id
            });
        }
        return res.status(500).send({
            message: "Error updating Client Api with id " + req.body.id
        });
    });

};

exports._deleteClientApi = (req, res, next) => {
    ClientApi.findByIdAndRemove(req.body.id)
        .then(clientapi => {
            if (!clientapi) {
                return res.status(404).send({
                    message: "Client api not found with id " + req.body.id
                });
            }
            var idUser = clientapi._user;
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
            res.send({message: "Client Api deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Client Api not found with id " + req.body.id
            });
        }
        return res.status(500).send({
            message: "Could not delete Client Api with id " + req.body.id
        });
    });
};
