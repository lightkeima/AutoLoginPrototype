const mongoose = require('mongoose');

const profileScheme = new mongoose.Schema({
    id: {
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
    collection: 'profile'
});

module.exports = mongoose.model('profile', profileScheme);