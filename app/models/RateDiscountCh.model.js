const mongoose = require('mongoose');
const RateDiscount = require('./RateDiscount.model.js');
const ApplicationDay = require('./ApplicationDay.model');
const RoomType=require('./RoomType.model.js')
Schema = mongoose.Schema;

const RateDiscountChSchema = new Schema({
    minAge: { type: String, required: true },
    maxAge: { type: String, required: true },
    _discountAppDay:{type:Schema.Types.ObjectId, ref: 'ApplicationDay' },
    _rateDiscount:{type: Schema.Types.ObjectId, ref: 'RateDiscount' },
    _roomType:[{ type: Schema.Types.ObjectId, ref: 'RoomType'}], 
    
   
});

module.exports = mongoose.model('RateDiscountCh', RateDiscountChSchema);