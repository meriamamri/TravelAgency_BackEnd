const mongoose = require('mongoose');
const Destination = require('../models/Destination.model.js');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    code:  { type: String, required: true },
    psoCode: { type: String, required: true },
    name:{ type: String, required: true },
    logo:{ type: String, required: false},
    _cities:[{type: Schema.Types.ObjectId, ref: 'Destination' }]
});

module.exports = mongoose.model('Country', CountrySchema);