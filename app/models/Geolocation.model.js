const mongoose = require('mongoose');
Schema = mongoose.Schema;

const GeolocationSchema = new Schema({
    lat: { type: Number, required: false},
    long:{ type: Number, required: false},	
});

module.exports = mongoose.model('Geolocation', GeolocationSchema);