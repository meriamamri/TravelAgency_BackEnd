const mongoose = require('mongoose');
const Review=require('./Review.model.js')
Schema = mongoose.Schema;

const ReviewCategorySchema = new Schema({
    name:{ type: String, required: true },
    _reviews:[{type: Schema.Types.ObjectId, ref: 'Review'}]
});

module.exports = mongoose.model('ReviewCategory', ReviewCategorySchema);