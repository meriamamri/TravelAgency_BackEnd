const mongoose = require('mongoose');
const Establishment = require('../models/Establishment.model.js');
Schema = mongoose.Schema;

const HotelChainSchema = new Schema({
    code: { type: String, required: true },
    name:  { type: String, required: true },
    logo: { type: String, required: false },
});

module.exports = mongoose.model('HotelChain', HotelChainSchema);