const mongoose = require('mongoose');
const RateType = require('./RateType.model.js');
Schema = mongoose.Schema;

const RateCommentSchema = new Schema({
    content: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true }, 
});

module.exports = mongoose.model('RateComment', RateCommentSchema);