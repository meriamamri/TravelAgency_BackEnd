const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Account = require("../models/Account.model");
const Role = require("../models/Role.model");
/*********************    LOGIN with roles    *************************/
exports.authenticate = async (req, res, next) => {

    console.log(req.body.role);

    await Role.findOne({name: req.body.role}).populate('_acounts').exec((err, accountsRole) => {
        if (!accountsRole) return res.send({
            'type': 'error',
            'message': 'Invalid role.'
        });
        var accounts = accountsRole._acounts;
        // return res.json(accountsRole._acounts);
        Account.findOne({userName: req.body.userName}).exec((err, account) => {
            if (!account) return res.send({
                'type': 'error',
                'message': 'Invalid email or password.'
            });
            let current = account;

            console.log(current._id);
            var existe = false;
            accounts.every(function (value) {
                console.log(value._id);
                console.log(current._id);
                console.log(value._id.equals(current._id));
                if (value._id.equals(current._id)) {
                    existe = true;
                    return false;
                }
                return true;
            });
            if (existe) {
                if (!current.confirmed) {
                    return res.send({
                        'type': 'error',
                        'message': 'Please confirm your email to login'
                    });
                }
                const validPassword = bcrypt.compareSync(req.body.password, current.password);
                if (!validPassword) return res.send({
                    'type': 'error',
                    'message': 'Invalid email or password.'
                });
                const {...userWithoutHash} = current.toObject();
                const token = jwt.sign({
                    sub: current._id,
                    role: req.body.role,
                    userName: current.userName
                }, config.secret);
                res.set('x-access-token', token);
                return res.json({
                    'type': 'success',
                    ...userWithoutHash,
                    token
                });
            } else {
                return res.send({
                    'type': 'error',
                    'message': 'account not for ' + req.body.role
                });
            }
        });
    });

    /*const user = await Account.findOne({ userName: req.body.userName });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const { ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user._id, role: req.body.role, userName: user.userName }, config.secret);
    return res.json({
        ...userWithoutHash,
        token
    });
*/
};

exports.updatePassword = async (req, res, next) => {
        // Validate Request
        if (!req.body.id) {
            return res.status(400).send({
                message: "Account can not be empty"
            });
        }

        // Find note and update it with the request body
            await  Account.findByIdAndUpdate(req.body.id, {
             password: bcrypt.hashSync(req.body.password, 10)
        }, { new: true })
            .then(account => {
                if (!account) {
                    return res.status(404).send({
                        message: "account not found with id " + req.body.id
                    });
                }
                res.send(account);
            }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "account not found with id " + req.body.id
                });
            }
            return res.status(500).send({
                message: "Error updating account with id " + req.body.id
            });
        });
};