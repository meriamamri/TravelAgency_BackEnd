const mongoose = require('mongoose');
const EstablishmentType = require('./EstablishmentType.model.js');
const Establishment = require('./Establishment.model.js');
Schema = mongoose.Schema;

const EstabRestructionSchema = new Schema({
    name:  { type: String, required: true },
    icon:  { type: String, required: true },
    //status:{type: String, default:'default'},
    //enabled:{type: Boolean},
    //EstablishmentType: { type: Schema.Types.ObjectId, ref: 'EstablishmentType' },
    _establishments:[{type: Schema.Types.ObjectId, ref: 'Establishment' }]
});

module.exports = mongoose.model('EstabRestruction', EstabRestructionSchema);


