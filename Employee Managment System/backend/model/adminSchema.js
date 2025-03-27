const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    adminName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    adminPhone: {
        type: Number,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },

});

const adminSchema = mongoose.model('admin', schema);

module.exports = adminSchema;