const mongoose = require('mongoose');
const Agency = require('../models/Module.model');
const Module = require('../models/Agency.model');
const User = require('../models/User.model');

const ClientAgencySchema = mongoose.Schema({
    agency: {
        type: Schema.Types.ObjectId,
        ref: 'Agency'
    },
    _user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    accepted: {
        type: Boolean, default: false, required: true
    },
    moduleAdminAgency: [{
        type: Schema.Types.ObjectId,
        ref: 'Module'
    }]
});

module.exports = mongoose.model('ClientAgency', ClientAgencySchema);