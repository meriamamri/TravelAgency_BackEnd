const mongoose = require('mongoose');
const RoomOccup = require('./RoomOccupancy.model.js');
const RateType = require('./RateType.model.js');
const RoomType = require('./RoomType.model.js');
const ApplicationDay=require('./ApplicationDay.model');
Schema = mongoose.Schema;

const RateSupplementSchema = new Schema({
    code:{type:String,required:false},
    name:{type:String,required:false},
    from:{type:String,required:false},
    to:{type:String,required:false},
    amount:{type:Number,required:false},
    nbNight:{type:Number,required:false},
    type:{type:String,required:false},
    priceType:{type:String,required:false},
    minAge:{type:Number,required:false},
    maxAge:{type:Number,required:false},
    Unit:{type:String,required:false},
    price:{type:Number,required:false},
    _rateType:[{type:Schema.Types.ObjectId, ref: 'RateType' }], 
    _roomOccupancy:[{ type: Schema.Types.ObjectId, ref: 'RoomOccup'}], 
    _roomType:[{ type: Schema.Types.ObjectId, ref: 'RoomType'}], 
    _appDay:{ type: Schema.Types.ObjectId, ref: 'ApplicationDay'}
});

module.exports = mongoose.model('RateSupplement', RateSupplementSchema);