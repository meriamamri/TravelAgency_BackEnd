const mongoose = require('mongoose');
const Country = require('../models/Country.model.js');
const Adress = require('../models/HotelAdress.model.js');
const Schema = mongoose.Schema;

const DestinationSchema = new Schema({
    name:  { type: String, required: true },
    _country: { type: Schema.Types.ObjectId, ref: 'Country' },
    _hotelAdress:[{type: Schema.Types.ObjectId, ref: 'Adress'}]
});

module.exports = mongoose.model('Destination', DestinationSchema);