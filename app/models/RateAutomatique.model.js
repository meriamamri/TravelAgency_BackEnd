const mongoose = require('mongoose');
const RateType = require('./RateType.model.js');
const RoomOccupancy = require('./RoomOccupancy.model.js');
Schema = mongoose.Schema;

const RateAutomatiqueSchema = new Schema({
    operation: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    _rateTypeBase:{type: Schema.Types.ObjectId, ref: 'RateType' },
    _rateType:{type:Schema.Types.ObjectId, ref: 'RateType' }, 
    _roomOccupancy:{ type: Schema.Types.ObjectId, ref: 'RoomOccupancy'},
 
});

module.exports = mongoose.model('RateAutomatique', RateAutomatiqueSchema);