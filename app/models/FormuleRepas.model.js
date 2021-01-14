const mongoose = require('mongoose');
Schema = mongoose.Schema;

const FormuleRepasSchema = new Schema({
    code: {type: String, required: true},
    name: { type: String, required: true },
});

module.exports = mongoose.model('FormuleRepas', FormuleRepasSchema);