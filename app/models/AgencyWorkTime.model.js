const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgencyWorkDaySchema = new Schema({
   from:{type:Date,required: true} ,
   to:{type:Date,required: true} 
});

module.exports = mongoose.model('AgencyWorkDay', AgencyWorkDaySchema);