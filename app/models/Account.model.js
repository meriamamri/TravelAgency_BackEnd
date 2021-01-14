const mongoose = require('mongoose');
const Role = require('../models/Role.model.js');
const Tracability = require('../models/Tracability.model');

const AccountSchema = mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    confirmed: {type: Boolean, default: false, required: true},
    blocked: {type: Boolean, default: false, required: true},
    _role: {type: Schema.Types.ObjectId, ref: 'Role'},
    _tracabilities: [{type: Schema.Types.ObjectId, ref: 'Tracability'}]
});

AccountSchema.pre('save', function(next) {
    if (!this.created) this.created = new Date;
    next();
});

module.exports = mongoose.model('Account', AccountSchema);