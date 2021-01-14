const mongoose = require('mongoose');
const EstablishmentService = require('./EstablishmentService.model.js');

Schema = mongoose.Schema;

const EstabServiceCategorySchema = new Schema({
    name: { type: String, required: true },
    icon: { type: String },
   _services:[{type: Schema.Types.ObjectId, ref: 'EstablishmentService'}]
});

module.exports = mongoose.model('EstabServiceCategory', EstabServiceCategorySchema);