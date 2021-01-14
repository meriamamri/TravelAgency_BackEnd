const mongoose = require('mongoose');
const RoomType=require('./RoomType.model.js')
Schema = mongoose.Schema;
const RoomOccupancySchema = new Schema({
    nbAd: { type: Number, required: true },
    nbCh: { type: Number, required: true },
	status: { type: Boolean },
    roomtype:{type: Schema.Types.ObjectId, ref: 'RoomType'}
});

module.exports = mongoose.model('RoomOccup', RoomOccupancySchema);