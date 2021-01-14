const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConcellationPolicySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    period: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    pabsentAmount: {
        type: Number,
        required: true
    },
    typeConcellation: {
        type: Number,
        required: true},
});

module.exports = mongoose.model('ConcellationPolicy', ConcellationPolicySchema)