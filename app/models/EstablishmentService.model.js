const mongoose = require('mongoose');
const EstabServiceCategory = require('./EstabServiceCategory.model.js');
const Establishment = require('./Establishment.model');
Schema = mongoose.Schema;

const EstablishmentServiceSchema = mongoose.Schema({
      name:  { type: String },
 //   icon: {type:String },
    _category: [{ type: Schema.Types.ObjectId, ref: 'EstabServiceCategory', required: true }],
    _hotels:[{type: Schema.Types.ObjectId, ref: 'Establishment' }]
});

module.exports = mongoose.model('EstablishmentService', EstablishmentServiceSchema);