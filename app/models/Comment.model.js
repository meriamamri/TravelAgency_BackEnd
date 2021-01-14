const mongoose = require('mongoose');
const Account = require('../models/Account.model.js');
const Establishment = require('../models/Establishment.model.js');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: { type: String, required: false },
    date:{ type: Date, required: false },
    likes:{ type: Number, required: false },
    _responses:[{type: Schema.Types.ObjectId, ref: 'Comment'}],
    _account: {  type: Schema.Types.ObjectId, ref: 'Account' },
    _establishment:{type: Schema.Types.ObjectId, ref: 'Establishment' },
});

module.exports = mongoose.model('Comment', CommentSchema);