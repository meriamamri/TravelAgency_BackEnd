const mongoose = require('mongoose');
const ActionModule = require('./ActionModule.model.js');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
    
    name:  { type: String, required: true },
    enabled: { type: Boolean, default:false,required: true },
    _actions:[{type: Schema.Types.ObjectId, ref: 'ActionModule'}]
});

module.exports = mongoose.model('Module', ModuleSchema);