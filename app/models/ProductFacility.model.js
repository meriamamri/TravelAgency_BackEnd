const mongoose = require('mongoose');
Schema = mongoose.Schema;
const ProductFacilityType = require('./ProductFacilityType.model.js');

const ProductFacilitySchema = new Schema({
    name:{ type: String },
    icon:{ type:String },
    _type :[{type: Schema.Types.ObjectId, ref: 'ProductFacilityType'}],
});

module.exports = mongoose.model('ProductFacility', ProductFacilitySchema);