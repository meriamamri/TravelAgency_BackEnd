const mongoose = require('mongoose');
Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:{ type: String, required: true },    
});

module.exports = mongoose.model('Product', ProductSchema);