const mongoose = require('mongoose');
const Module =require('../models/Module.model.js')
const Schema = mongoose.Schema;

const ActionModuleSchema = new Schema({
    
    name:  { type: String, required: true },
    enabled: { type: Boolean, default:false,required: true },
    _module:{type:Schema.Types.ObjectId,ref:'Module'}
    
});

module.exports = mongoose.model('ActionModule', ActionModuleSchema);