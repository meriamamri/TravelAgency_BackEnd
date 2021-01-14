const mongoose = require('mongoose');
const ConcellationPolicy= require('./ConcellationPolicy.model.js');
const FormuleBoisson = require('./FormuleBoisson.model.js');
const FormuleRepas = require('./FormuleRepas.model.js');
const RoomType = require('./RoomType.model.js');
Schema = mongoose.Schema;

const RateTypeSchema = new Schema({ 
    name: { type: String, required: true },
    priceType: { type: String, required: true },
    automatique:{ type: Boolean, required: true },
    showType:{ type: String, required: true }, 
    minStay:{type: Number, required: true},
    nbPostShow:{ type: Number, required: true },
    _roomType:[{ type: Schema.Types.ObjectId, ref: 'RoomType', required: true}],
    _concellationPolicy:[{ type: Schema.Types.ObjectId, ref: 'ConcellationPolicy', required: true}],
    _formuleRepas:[{ type: Schema.Types.ObjectId, ref: 'FormuleRepas', required: true}],
    _formuleBoisson:[{ type: Schema.Types.ObjectId, ref: 'FormuleBoisson', required: true}],
    _product: {type: Schema.Types.ObjectId, ref: 'Establishment', required: false}
});

module.exports = mongoose.model('RateType', RateTypeSchema);