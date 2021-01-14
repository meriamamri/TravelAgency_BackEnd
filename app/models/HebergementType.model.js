const mongoose = require('mongoose');
Schema = mongoose.Schema;

const HebergementTypeSchema = new Schema({
    name: { type: String, required: true },
});

module.exports = mongoose.model('HebergementType', HebergementTypeSchema);