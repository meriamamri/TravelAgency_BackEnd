const mongoose = require('mongoose');
Schema = mongoose.Schema;

const LanguageSchema = new Schema({
    code: { type: String, required: true },
    name:  { type: String, required: true },
	logo: { type: String, required: true },
});

module.exports = mongoose.model('Language', LanguageSchema);