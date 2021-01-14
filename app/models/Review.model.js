const mongoose = require('mongoose');
const ReviewCategory = require('./ReviewCategory.model.js');
const Establishment = require('./Establishment.model.js');
const Account = require('./Account.model.js');
Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    name:{ type: String, required: true },
    like:{ type: Number, required: true },
    _category:{ type: Schema.Types.ObjectId, ref: 'ReviewCategory' },
    _account: {  type: Schema.Types.ObjectId, ref: 'Account' }, 
    _establishment:{type: Schema.Types.ObjectId, ref: 'Establishment'}  
});

module.exports = mongoose.model('Review', ReviewSchema);