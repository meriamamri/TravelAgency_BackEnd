const mongoose = require('mongoose');
const RateDiscount = require('./RateDiscount.model.js');
const RoomType=require('./RoomType.model.js')
Schema = mongoose.Schema;

const RateDiscountAdSchema = new Schema({
    troiDiscount: { type: Number, required: true },
    quatDiscount: { type: Number, required: true },
    _rateDiscount:{type: Schema.Types.ObjectId, ref: 'RateDiscount' },
    _roomType:[{ type: Schema.Types.ObjectId, ref: 'RoomType'}],
   
    
});

module.exports = mongoose.model('RateDiscountAd', RateDiscountAdSchema);