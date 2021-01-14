const mongoose = require('mongoose');
const Establishment = require('./Establishment.model.js');
const Description = require('./Description.model.js');
const Schema = mongoose.Schema;

const ConditionSchema = new Schema({
    title:  { type: String, required: true },
    nbjour:  { type: Number, required: true },
    establishment: {type: Schema.Types.ObjectId, ref: 'Establishment'},
    descriptions: [{type: Schema.Types.ObjectId, ref: 'Description'}]
});

module.exports = mongoose.model('EstabCondition', ConditionSchema);