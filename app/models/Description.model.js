const mongoose = require('mongoose');
const Language = require('./Language.model.js');
const Establishment = require('./Establishment.model.js');
const RoomType = require('./RoomType.model.js');
const EstabCondition = require('./EstabCondition.model.js');
Schema = mongoose.Schema;

const DescriptionSchema = new Schema({
    content:  { type: String, required: true },
    language: { type: Schema.Types.ObjectId, ref: 'Language' },
    estabCondition: { type: Schema.Types.ObjectId, ref: 'EstabCondition' },
    _hotel:{type: Schema.Types.ObjectId, ref: 'Establishment'},
    _roomType:{type: Schema.Types.ObjectId, ref: 'RoomType'}
});

module.exports = mongoose.model('Description', DescriptionSchema);