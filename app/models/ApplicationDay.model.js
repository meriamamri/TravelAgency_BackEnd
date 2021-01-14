const mongoose = require('mongoose');
const RateType = require('./RateType.model.js');


const ApplicationDaySchema = mongoose.Schema({
    mon: { type: Number, required: true },
    tue: { type: Number, required: true },
    wed: { type: Number, required: true },
    thu: { type: Number, required: true },
    fri: { type: Number, required: true },
    sat: { type: Number, required: true },
    sun: { type: Number, required: true },

});

module.exports = mongoose.model('ApplicationDay', ApplicationDaySchema);