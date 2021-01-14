const smtpTransport = require('../config/configEmail');
const bcrypt = require('bcryptjs');
const User = require("../models/User.model");
const Account = require("../models/Account.model");
const Role = require("../models/Role.model");
const AgentAgency = require("../models/AgentAgency.model");
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
/********************     CRUD Agent Agency     ********************/
exports.registerAgentAgency = async (req, res, next) => {
    if (await User.findOne({ email: req.body.email })) {
        return res.status(400).send('Email "' + req.body.email + '"is already taken');
    }

    if (await Account.findOne({ userName: req.body.userName })) {
        return res.status(400).send('UserName "' + req.body.userName + '"is already taken');
    }

    Role.findOne({ name: 'agent_agency' }, '_id', function (err, role) {
        if (!role) {
            return res.status(400).send('Role not found');
        }
        else {
            const account = new Account(
                {
                    userName: req.body.userName,
                    password: bcrypt.hashSync(req.body.password),
                    _role: role
                }
            );
            account.save();

            account.on('save', function (new_account) {
                console.log("Account's ID:" + new_account._id);
                Role.findOne({ "_id": role }, function (err, result) {
                    console.log(result);
                    console.log(err);
                    if (!err && result) {
                        result._acounts.push(new_account._id);
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
                    const agentAgency = new AgentAgency(
                        {
                            _user: new_user._id,
                            _adminagency: req.body._adminagency
                        });
                    agentAgency.save()
                        .then(() => res.json({
                            status: "200",
                            message: "succes"
                        }))
                        .catch(err => next(err));
                });
            })
        }
    })

};

exports.getAllAgents = async (req, res, next) => {
    await Role.findOne({ name: "agent_agency" }).populate('_acounts').exec((err, accountsRole) => {
        if (!accountsRole) return res.status(400).send('Account not found');
        var usersListe, accounts, listeAgents, finalList = [];
        accounts = accountsRole._acounts;
        //console.log(accounts);

        User.find().exec((err, users) => {
            if (!users) return res.status(400).send('Invalid users');
            usersListe = users;
            /*listes des agents*/

            AgentAgency.find().exec((err, agents) => {
                if (!agents) return res.status(400).send('Invalid agents.');
                /****** affecter la liste des clients dans un array *****/
                listeAgents = agents;
                //console.log(listeAgents);

                var item;
                accounts.every(function (value) {
                    console.log(value._id);
                    usersListe.every(function (user) {
                        if (value._id.equals(user._account)) {
                            listeAgents.every(function (agent) {
                                if (agent._user.equals(user._id)) {
                                    item = {
                                        user: user,
                                        agent: agent
                                    };
                                    return false;
                                }
                                return true;
                            });
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
}

exports.getAgent = function (req, res, next) {
    /****get the data of the client object  ****/
    AgentAgency.findById(req.body.id, function (err, agent) {
        if (err) {
            res.json({
                error: err
            })
        }
        /***** get the data of the user object *****/
        User.findOne({ _id: agent._user }, function (err, user) {
            if (err) {
                res.json({
                    error: err
                })
            }
            res.json({
                agent: agent,
                user: user
            })
        })
    })
};

exports.updateAgent = async (req, res) => {

    if (await !req.body.idAgentAgency) {
        return res.status(400).send({
            message: "Agent id can not be empty"
        });
    }

    if (await User.findOne({ email: req.body.email })) {
        return res.status(400).send('Email "' + req.body.email + '" is already taken');
    }

    // Find Client and update it with the request body
    AgentAgency.findByIdAndUpdate(req.body.idAgentAgency, {
        _adminagency: req.body._adminagency
    }, { new: true })
        .then(AgentAgency => {
            console.log(AgentAgency);
            if (!AgentAgency) {
                return res.status(404).send({
                    message: "Agent not found with id " + req.body.idAgentAgency
                });
            }

            // Find user and update it with the request body
            User.findByIdAndUpdate(AgentAgency._user, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone
            }, { new: true })
                .then(user => {
                    if (!user) {
                        return res.status(404).send({
                            message: "User not found with id " + AgentAgency._user
                        });
                    }
                    res.send({
                        Agent: Agent,
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
                message: "Agent not found with id " + req.body.id
            });
        }
        return res.status(500).send({
            message: "Error updating Agent with id " + req.body.id
        });
    });


};

exports._deleteAgent = (req, res, next) => {
    AgentAgency.findByIdAndRemove(req.body._id)
        .then(agent => {
            if (!agent) {
                return res.status(404).send({
                    message: "Agent not found with id " + req.body.id
                });
            }
            var idUser = agent._user;
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
            res.send({ message: "Agent deleted successfully!" });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Agent not found with id " + req.body.id
            });
        }
        return res.status(500).send({
            message: "Could not delete Product with id" + req.body.id
        });
    });
};
