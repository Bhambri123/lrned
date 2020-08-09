const mongoose = require('mongoose');

let status = mongoose.Schema({
    createdAt: {
        type: Date,
        required: true
    },
    time: {
        type: Date,
        required: true
    },gps: {
        type: Object,
        required: true
    },
});

let items = module.exports = mongoose.model('status', status);