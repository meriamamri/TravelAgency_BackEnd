const mongoose = require('mongoose');
const Account = require('./Account.model.js');
Schema = mongoose.Schema;

const TracabilitySchema = new Schema({
    description: { type: String, required: true },
    date:{ type: Date, required: true },
    _account:{ type: Schema.Types.ObjectId, ref: 'Account'}
});

module.exports = mongoose.model('Tracability', TracabilitySchema);