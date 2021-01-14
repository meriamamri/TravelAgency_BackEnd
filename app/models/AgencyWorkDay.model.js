const mongoose = require('mongoose');
const AgencyWorkTime = require('../models/AgencyWorkTime.model');
const Schema = mongoose.Schema;

const AgencyWorkDaySchema = new Schema({
   code:{type:String,required: true} ,
   day:{type:String,required: true} ,
   workTime:{type: Schema.Types.ObjectId, ref: 'AgencyWorkTime'}
});

module.exports = mongoose.model('AgencyWorkDay', AgencyWorkDaySchema);