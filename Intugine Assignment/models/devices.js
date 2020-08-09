const mongoose = require('mongoose');

let devices = mongoose.Schema({
    items: {
        type: String,
        required: true
    }
});

let Post = module.exports = mongoose.model('devices', devices);