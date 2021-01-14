const mongoose = require('mongoose');
const ProductFacility = require('./ProductFacility.model.js');
Schema = mongoose.Schema;

const ProductFacilityTypeSchema = new Schema({
    name: {type: String, required: true},
    _facilities: [{type: Schema.Types.ObjectId, ref: 'ProductFacility'}],
});

module.exports = mongoose.model('ProductFacilityType', ProductFacilityTypeSchema);