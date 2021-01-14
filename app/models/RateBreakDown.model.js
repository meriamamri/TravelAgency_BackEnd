const mongoose = require('mongoose');
const RateType = require('./RateType.model.js');
Schema = mongoose.Schema;

const RateAutomatiqueSchema = new Schema({
    commission: { type: String, required: true },
    tVA: { type: Number, required: true },
    Pourcentage: { type: Number, required: true }, 
});

module.exports = mongoose.model('RateAutomatique', RateAutomatiqueSchema);