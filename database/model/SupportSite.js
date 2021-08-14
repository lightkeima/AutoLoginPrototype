const mongoose = require('mongoose');

const supportWebSiteScheme = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
        min: 2,
        max: 2000,
    },
    name_of_id_field: {
        type: String,
        required: true,
        min: 0,
        max: 255,
    },
    name_of_password_field: {
        type: String,
        required: true,
        min: 0,
        max: 255,
    },
    name_of_form: {
        type: String,
        min: 0,
        max: 255,
    },
    name_of_button: {
        type: String,
        min: 0,
        max: 255,
    },
    id_find_by: {
        type: String,

    },
    pass_find_by: {
        type: String,

    },
    button_find_by: {
        type: String,

    },
    form_find_by: {
        type: String,

    },
    submit_type: {
        type: Boolean,

    },
}, {
    collection: 'website'
});

module.exports = mongoose.model('website', supportWebSiteScheme);