const mongoose = require('mongoose');
const Agency = require('./Agency.model.js');
const Geolocalisation = require('./Geolocation.model');
const AgencyDeposit = require('./AgencyDeposit.model');
const Adress = require('./Adress.model');


const AgencySchema = mongoose.Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    webSite: {type: String, required: true},
    marginAction: {type: String, required: true},
    margin: {type: Number, required: true},
    marginUnity: {type: String, required: true},
    fax: {type: String, required: true},
    emailAgency: {type: String, required: true},
    phoneAgency: {type: String, required: true},
    Adress: {type: Schema.Types.ObjectId, ref: 'Adress'},
    geolocalisation: {type: Schema.Types.ObjectId, ref: 'Geolocalisation'},
    _deposit: [{type: Schema.Types.ObjectId, ref: 'AgencyDeposit'}]
});

module.exports = mongoose.model('Agency', AgencySchema);
