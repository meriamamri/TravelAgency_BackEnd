const mongoose = require('mongoose');
Schema = mongoose.Schema;

const MetaInfoSchema = new Schema({
    title: { type: String, required: false },
    description:  { type: String, required: false },
    keyword: { type: String, required: false },
});

module.exports = mongoose.model('MetaInfo', MetaInfoSchema);