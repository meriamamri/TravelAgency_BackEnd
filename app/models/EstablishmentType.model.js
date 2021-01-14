const mongoose = require('mongoose');
const Establishment = require('./Establishment.model');
Schema = mongoose.Schema;

const EstablishmentTypeSchema = new Schema({
    code: { type: String, required: true },
    name:  { type: String, required: true },
    _hotels:[{type: Schema.Types.ObjectId, ref: 'Establishment'}]
});

module.exports = mongoose.model('EstablishmentType', EstablishmentTypeSchema);