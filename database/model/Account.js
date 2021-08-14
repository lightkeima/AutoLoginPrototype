const mongoose = require('mongoose');

const supportWebSiteScheme = new mongoose.Schema({
    id: {
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
        min: 2,
        max: 2000,
    },
    password: {
        type: String,
        required: true,
        min: 0,
        max: 255,
    },

}, {
    collection: 'account'
});

module.exports = mongoose.model('account', supportWebSiteScheme);