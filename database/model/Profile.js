const mongoose = require('mongoose');

const profileScheme = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    feature_vector: {
        type: [Number],
        required: false,
        min: 0,
        max: 2560,
    },
    username: {
        type: String,
        required: false,
        min: 0,
        max: 512,
    },
    password: {
        type: String,
        required: false,
        min: 0,
        max: 512,
    },

}, {
    collection: 'profile'
});

module.exports = mongoose.model('profile', profileScheme);