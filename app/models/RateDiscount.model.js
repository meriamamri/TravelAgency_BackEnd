const mongoose = require('mongoose');
const ApplicationDay=require('./ApplicationDay.model.js')
const RoomType=require('./RoomType.model.js')
const RoomOccup=require('./RoomOccupancy.model')
Schema = mongoose.Schema;

const RateDiscountSchema = new Schema({
    
    from: { type:Date},
    to: { type: Date}, 
    type:{ type: String},
    _rateType:[{type:Schema.Types.ObjectId, ref: 'RateType' }], 
    _roomOccupancy:[{ type: Schema.Types.ObjectId, ref: 'RoomOccup'}],
});

module.exports = mongoose.model('RateDiscount', RateDiscountSchema);