const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EstabCancellationSchema = new Schema({
    name:  { type: String, required: true },
    period: { type: Number, required: false },
    amount:{ type: Number, required: false },
    absentAmount: { type: Number, required: false },
    typeCancellation:{ type: Number, required: false },
    establishment:{type: Schema.Types.ObjectId, ref: 'Establishment'}
});

module.exports = mongoose.model('EstabCancellation', EstabCancellationSchema)