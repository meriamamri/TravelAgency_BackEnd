const mongoose = require('mongoose');
const Establishment = require('./Establishment.model');
const RateType = require('./RateType.model.js');
const HebergementType = require('./HebergementType.model.js');
const ProductFacility = require('./ProductFacility.model.js');
const RoomOccupancy = require('./RoomOccupancy.model.js');
const StopSale = require('../models/StopSale.model.js');
const Description = require('../models/Description.model');
Schema = mongoose.Schema;

const RoomTypeSchema = new Schema({
    code: {type: String,required: true},
    name: {type: String,required: true},
    photo: { type: String, required: true },
    nbRoom: {type: Number,required: true},
    minStay: {type: Number,required: true},
    nbExtraBed: {type: Number, required: true},
    size: {type: Number, required: true},
    singleBed: {type: Number, required: true},
    largeBed: {type: Number, required: true},
    maxOccup: {type: Number, required: true},
    priceLitBB: {type: Number, required: false},
    numberLitBB: {type: Number, required: false},
    reserved: [{type: Date, required: true}],
    _product: {type: Schema.Types.ObjectId, ref: 'Establishment'},
    _hebergementType: {type: Schema.Types.ObjectId, ref: 'HebergementType'},
    _equipements: [{type: Schema.Types.ObjectId, ref: 'ProductFacility'}],
    _occupancies: [{type: Schema.Types.ObjectId, ref: 'RoomOccupancy'}],
    _stopSales: [{type: Schema.Types.ObjectId, ref: 'StopSale'}],
    _descriptions: [{type: Schema.Types.ObjectId, ref: 'Description'}]
});

module.exports = mongoose.model('RoomType', RoomTypeSchema);