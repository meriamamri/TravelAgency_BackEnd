const mongoose = require('mongoose');
//const Rate = require('./ApplicationDay.model.js');
const RoomOccupancy = require('./RoomOccupancy.model.js');
const RateType = require('./RateType.model.js');
//const RoomType = require('./RoomType.model.js');
const ApplicationDay =require('./ApplicationDay.model')
Schema = mongoose.Schema;

const RateMarginSchema = new Schema({
    from:{type:Date,required:true},
    to:{type:Date,requerd:true},
    marge1:{type:String,required:true},
    marge2:{type:String,required:true},
    unit:{type:String,requerd:true},
    unitMonetaire:{type:Date,requerd:true},
    _marginApplicationDay:{type: Schema.Types.ObjectId, ref: 'ApplicationDay' },
    _rateType:[{type:Schema.Types.ObjectId, ref: 'RateType' }],
    _roomOccupancy:[{ type: Schema.Types.ObjectId, ref: 'RoomOccupancy'}],
    //  _roomType:[{ type: Schema.Types.ObjectId, ref: 'RoomType'}],
});

module.exports = mongoose.model('RateMargin', RateMarginSchema);