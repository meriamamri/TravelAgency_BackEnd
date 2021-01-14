const mongoose = require('mongoose');
const Adress = require('./Adress.model.js');
const SocialConnection = require('./SocialConnection.model.js');
const Account = require('./Account.model.js');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    _adress: {
        type: Schema.Types.ObjectId, ref: 'Adress'
    },
    _socialAccount: [{
        type: Schema.Types.ObjectId, ref: 'SocialConnection'
    }],
    _account: {
        type: Schema.Types.ObjectId, ref: 'Account'
    }
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);