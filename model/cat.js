const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    year: { type: Number },
    month: { type: Number },
    weight: { type: Number },
    image: { type: String },
    food: { type: String },
    portion: { type: Number },
    vaccine: [{
        name: { type: String },
        date: { type: Date, default: Date.now },
        times: { type: Number },
    }]
});

module.exports = mongoose.model('Cat', catSchema);