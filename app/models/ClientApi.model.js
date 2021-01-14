const mongoose = require('mongoose');
const User = require('../models/User.model');

const ClientAPISchema = mongoose.Schema({
    name_company: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean, default: false, required: true
    },
    _user: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
});

module.exports = mongoose.model('ClientApi', ClientAPISchema);