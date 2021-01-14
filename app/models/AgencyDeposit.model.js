const mongoose = require('mongoose');
const Currency = require('./Currency.model.js');
const Agency = require('./Agency.model');
const Schema = mongoose.Schema;

const AgencyDepositSchema = new Schema({
   amount:{type:Number,required: true} ,
   date:{type:Date,required: true} ,
   observation:{type:String,required: false} ,
   _agency:{type: Schema.Types.ObjectId, ref: 'Agency'},
   _currency:{type: Schema.Types.ObjectId, ref: 'Currency'},
});

module.exports = mongoose.model('AgencyDeposit', AgencyDepositSchema);
