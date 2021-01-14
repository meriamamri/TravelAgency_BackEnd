const mongoose = require('mongoose');
const RatePromotionType = require('./RatePromotionType.model.js');
//const RoomOccupancy = require('./RoomOccupancy.model.js');
const RateType = require('./RateType.model.js');
//const RoomType=require('./RoomType.model.js');
const HebergementType = require('./HebergementType.model.js');
Schema = mongoose.Schema;

const RatePromotionSchema = new Schema({
    minStay:{type:Number,required:true},
    unit:{type:Number,required:true},
    reductionC :{type:String,required:true},
    from:{type:Date,required:true},
    to:{type:Date,required:true},
    applicationPromo:{type:String,required:true},
    name:{type:String,required:true},
    //supplementaire
    datepromoearlybooking:{type:Date},
    //nbJsejour:{type:Number},
    avantj:{type:Number},
    datejour:{type:Date},
    //dernier minute
    condjourpreced:{type:String},
    condheurepreced:{type:String},
    jourpreced:{type:Number},
    heurepreced:{type:Number},
    //forgein key
   // _PromotionType:[{type: Schema.Types.ObjectId, ref: 'RatePromotionType'}],
    _hebergement:[{type: Schema.Types.ObjectId, ref: 'HebergementType'}],
    _rateType:[{type:Schema.Types.ObjectId, ref: 'RateType' }],
    //_roomOccupancy:[{ type: Schema.Types.ObjectId, ref: 'RoomOccupancy'}],
    //_roomType:[{ type: Schema.Types.ObjectId, ref: 'RoomType'}],
});

module.exports = mongoose.model('RatePromotion', RatePromotionSchema);