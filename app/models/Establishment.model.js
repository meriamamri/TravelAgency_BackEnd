const mongoose = require('mongoose');
const Adress = require('../models/HotelAdress.model');
const Geolocation = require('../models/Geolocation.model.js');
const MetaInfo = require('../models/MetaInfo.model.js');
const Image = require('../models/Image.model.js');
const HotelChain = require('../models/HotelChain.model.js');
const HotelContact = require('../models/HotelContact.model.js');
const Account = require('../models/Account.model.js');
const EstablishmentType = require('../models/EstablishmentType.model');
const EstablishmentService = require('../models/EstablishmentService.model.js');
const PayementCard = require('../models/PayementCard.model.js');
const EstabRestruction = require('../models/EstabRestruction.model.js');
const SocialConnection = require('../models/SocialConnection.model');
const EstabCancellation = require('../models/EstabCancellation.model');
//const RoomType = require('../models/RoomType.model.js');
//const RateType = require('../models/RateType.model.js');
const Review = require('../models/Review.model.js').schema


const EstablishmentSchema = mongoose.Schema({
    code: { type: String},
    name: { type: String },
    description:  { type: String},
    fax:{type: String},
    checkIn: { type: String},
    checkOut: { type: String },
    webSite:{type: String},
    stars:{type: Number},
    ageBB:{type: Number},
    ageEnfant:{type: Number},
    urlAdvisor:{type: String},
    recomanded:{type: Boolean},
    aCompte:{type: Boolean},
    status:{type: Boolean},
    onLignePay:{type: Boolean},
    nameArabe: { type: String },
    descriptionArabe:  { type: String},
    _paymentCards:[{type: Schema.Types.ObjectId, ref: 'PayementCard' }],
    _typeEstab:{type: Schema.Types.ObjectId, ref: 'EstablishmentType' },
    _restructions:[{type: Schema.Types.ObjectId, ref: 'EstabRestruction' }],
    _hotelChain:{type: Schema.Types.ObjectId, ref: 'HotelChain' },
    _services:[{type: Schema.Types.ObjectId, ref: 'EstablishmentService' }],
    _geolocation:{type: Schema.Types.ObjectId, ref: 'Geolocation'},
    _adress:{ type: Schema.Types.ObjectId, ref: 'Adress' },
    _metaInfo:{type: Schema.Types.ObjectId, ref: 'MetaInfo'},
    _contacts:[{type: Schema.Types.ObjectId, ref: 'HotelContact'}],
    _images:[{type: Schema.Types.ObjectId, ref: 'Images'}],
    _rateTypes:[{type: Schema.Types.ObjectId, ref: 'RateType'}],
    _reviews :[{type: Schema.Types.ObjectId, ref: 'Review'}],
    _socialConnections :[{type: Schema.Types.ObjectId, ref: 'SocialConnection'}],
    _roomTypes :[{type: Schema.Types.ObjectId, ref: 'RoomType'}],
    _conditions :[{type: Schema.Types.ObjectId, ref: 'EstabCancellation'}]
});

module.exports = mongoose.model('Establishment', EstablishmentSchema);


  