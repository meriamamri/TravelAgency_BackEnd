const mongoose = require('mongoose');
const Account = require('../models/Account.model')
const RoleSchema = mongoose.Schema({
    code: { type: Number, required: true },
    name: { type: String, required: true },
    _acounts:[{type: Schema.Types.ObjectId, ref: 'Account'}]
});

module.exports = mongoose.model('Role', RoleSchema);