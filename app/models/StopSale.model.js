const mongoose = require('mongoose');
const Product = require('./Product.model.js');
const OnDemand = require('./OnDemand.model.js');
Schema = mongoose.Schema;

const StopSaleSchema = new Schema({
    from: { type: String, required: true },
    to: { type: Number, required: true }, 
    _onDemands:[{type: Schema.Types.ObjectId, ref: 'OnDemand' }],
    _Product:{type: Schema.Types.ObjectId, ref: 'Product' }
});

module.exports = mongoose.model('StopSale', StopSaleSchema);