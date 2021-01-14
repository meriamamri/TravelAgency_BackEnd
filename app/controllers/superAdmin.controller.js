const bcrypt = require('bcryptjs');
const Account = require("../models/Account.model");
const Role = require("../models/Role.model");
/********************     CRUD SUPER ADMIN    ********************/
exports.registerSuperAdmin = (req, res, next) => {
    Role.findOne({name: 'superAdmin'}, '_id', function (err, role) {
        if (!role) {
            //roleCtrl.addRole5();
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

                Role.findOne({"_id": role}, function (err, result) {
                    if (!err && result) {
                        result._acounts.push(new_account._id); // update ur values goes here
                        var nvrole = new Role(result);
                        nvrole.save();

                    }
                    return res.send('good');
                });
            });
        }
    });

};


exports.updateSuperAdmin = (req, res, next) => {
    if ( !req.body.idAccount) {
        return res.status(400).send({
            message: "Account id can not be empty"
        });
    }
    Account.findByIdAndUpdate(req.body.idAccount, {
        userName: req.body.userName,
        password: req.body.password

    }, {new: true})
        .then(acc => {
            if (!acc) {
                return res.status(404).send({
                    message: "Account not found with id "
                });
            }
            res.send('account');
        })
        .catch(err => {
            return res.status(500).send({
                message: err
            });
        });
};