const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
    name: {type: String, required: true},
    symbol: {type: String, required: true},
    tarif: {type: Number, required: true},
    active: {type: Boolean, required: true}
});

module.exports = mongoose.model('Currency', CurrencySchema);
