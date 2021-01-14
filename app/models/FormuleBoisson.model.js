const mongoose = require('mongoose');
Schema = mongoose.Schema;

const FormuleBoissonSchema = new Schema({
    code: {type:String, required: true},
    name: { type: String, required: true },
});

module.exports = mongoose.model('FormuleBoisson', FormuleBoissonSchema);