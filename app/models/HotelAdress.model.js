const mongoose = require('mongoose');
const Destination = require('../models/Destination.model.js');
const Schema = mongoose.Schema;

const HotelAdressSchema = new Schema({
    adress: { type: String, required: true },
    postalCode: { type: String, required: true },
    dCity:{type: Number},
    dNearliyT:{type: Number},
    _city:{type: Schema.Types.ObjectId, ref: 'Destination'}
});

module.exports = mongoose.model('HotelAdress', HotelAdressSchema);;