const mongoose = require('mongoose');
Schema = mongoose.Schema;

const EstabAvailabilitySchema = new Schema({
    available: { type: Boolean, required: true }
});

module.exports = mongoose.model('EstabAvailability', EstabAvailabilitySchema);