const mongoose = require('mongoose')
const Establishment = require('../models/Establishment.model.js');
Schema = mongoose.Schema;

const HotelContactSchema = new Schema({
    firstName: { type: String, required: false },
    lastName:{ type: String, required: false },
    email:{ type: String, required: false },
    phone:{ type: String, required: false },
    job:{ type: String, required: false },
    _establishment:{type: Schema.Types.ObjectId, ref: 'Establishment'}
});

module.exports = mongoose.model('HotelContact', HotelContactSchema);