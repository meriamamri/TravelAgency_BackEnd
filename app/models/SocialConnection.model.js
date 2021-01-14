const mongoose = require('mongoose');
const User=require('./User.model.js')
const Agency=require('./Agency.model.js')
const Establishment=require('./Establishment.model.js')


const SocialConnectionSchema = new mongoose.Schema({
    link: { type: String, required: false },
    // type in [ youtube insta..] 
    type:{ type: String, required: false },
    //associatedTo Client agence hotel ...
    associated:{ type: String, required: false },
    _user:{type: Schema.Types.ObjectId, ref: 'User' },
    _hotel:{type: Schema.Types.ObjectId, ref: 'Establishment' },
    _agence:{type: Schema.Types.ObjectId, ref: 'Agency' }
});

module.exports = mongoose.model('SocialConnection', SocialConnectionSchema);