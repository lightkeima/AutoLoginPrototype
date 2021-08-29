const mongoose = require('mongoose');

const accountScheme = new mongoose.Schema({

    id: {
        type: Number,
        required: true,
    },
    profile_id: {
        type: Number,
        required: true,
    },
    web_id: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
        min: 0,
        max: 512,
    },
    password: {
        type: String,
        required: true,
        min: 0,
        max: 512,
    },

}, {
    collection: 'account'
});

module.exports = mongoose.model('account', accountScheme);