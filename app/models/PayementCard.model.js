const mongoose = require('mongoose');
const Establishment = require('./Establishment.model');
Schema = mongoose.Schema;

const PayementCardSchema = new Schema({
    
    name:  { type: String, required: true },
    icon:  { type: String, required: false },
    _establishments:[{type: Schema.Types.ObjectId, ref: 'Establishment'}]
});

module.exports = mongoose.model('PayementCard', PayementCardSchema);