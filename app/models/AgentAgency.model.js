const mongoose = require('mongoose');
const Module = require('../models/Agency.model');
const ClientAgency = require('../models/ClientAgency.model');
const User = require('../models/User.model');

const AgentAgencySchema = mongoose.Schema({
    _moduleagentagency: {
        type: Schema.Types.ObjectId,
        ref: 'Module'
    },
    _user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    _adminagency :{
        type: Schema.Types.ObjectId,
        ref: 'ClientAgency'
    }
});
module.exports = mongoose.model('AgentAgency', AgentAgencySchema);