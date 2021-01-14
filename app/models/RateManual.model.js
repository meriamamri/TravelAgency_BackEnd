const mongoose = require('mongoose');
const RoomType = require('./RoomType.model.js');
const Rate = require('./Rate.model.js');
Schema = mongoose.Schema;

const RateManualSchema = new Schema({
    rate:[{type: Schema.Types.ObjectId, ref: 'Rate'}],
    _roomType:{type:Schema.Types.ObjectId,ref:'RoomType'} 
});

module.exports = mongoose.model('RateManual', RateManualSchema);