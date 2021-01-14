const mongoose = require('mongoose');
const RateType = require('./RateType.model.js');
const RatePromotion = require('./RatePromotion.model.js');
Schema = mongoose.Schema;

const RatePromotionTypeSchema = new Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
   // icon:{type:String,required:true},
    _ratePromotions:[{ type: Schema.Types.ObjectId, ref: 'RatePromotion'}]
});

module.exports = mongoose.model('RatePromotionType', RatePromotionTypeSchema);