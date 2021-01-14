const mongoose = require('mongoose');
const RateType = require('./RateType.model.js');
const RateBreakDown = require('./RateBreakDown.model.js');
const RateComment = require('./RateComment.model.js');
const ApplicationDay = require('./ApplicationDay.model.js');
Schema = mongoose.Schema;

const RateSchema = new Schema({
    //code: { type: String, required: true },
    //class: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    //type: { type: String, required: true },
    unity: { type: String, required: true },
    release: { type: Number, required: true },   
    //_rateComment:{type: Schema.Types.ObjectId, ref: 'RateComment' },
    //_rateBreakDown:{type: Schema.Types.ObjectId, ref: 'RateBreakDown' },
    _priceApplicationDay:{type: Schema.Types.ObjectId, ref: 'ApplicationDay', required: true},
    _rateType:{type: Schema.Types.ObjectId, ref: 'RateType', required: true}
});

module.exports = mongoose.model('Rate', RateSchema);