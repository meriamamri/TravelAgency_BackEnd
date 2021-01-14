const mongoose = require('mongoose');
var User = require('../models/User.model.js');

const ClientSchema = mongoose.Schema({
    nationality: {
        type: String,
        required: true
    },
    cinOrPassport: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        require: true
    },
    _user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
});

ClientSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Client', ClientSchema);