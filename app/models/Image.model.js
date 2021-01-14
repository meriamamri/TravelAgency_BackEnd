const mongoose = require('mongoose');
const Establishment = require('../models/Establishment.model.js');
Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: { type: String, required: false },
    description:  { type: String, required: false },
    heigth: { type: Number,required: false },
    width: { type: Number,required: false },
    _establishment:{type: Schema.Types.ObjectId, ref: 'Establishment'}
});

module.exports = mongoose.model('Image', ImageSchema);