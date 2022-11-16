const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, default: null, unique: true, sparse: true },
    password: { type: String, default: null, unique: true },
    token: { type: String },
    cats: [{
        name: { type: String },
        year: { type: Number },
        month: { type: Number },
        weight: { type: Number },
        image: { type: String },
        food: { type: String },
        vaccine: [{
            name: { type: String },
            date: { type: Date, default: Date.now },
            times: { type: Number },
        }]
    }]
});

module.exports = mongoose.model('user', userSchema);