const mongoose = require('mongoose');
Schema = mongoose.Schema;

const OnDemandSchema = new Schema({
    from: { type: String, required: true },
    to: { type: Number, required: true },
     
});

module.exports = mongoose.model('OnDemand', OnDemandSchema);