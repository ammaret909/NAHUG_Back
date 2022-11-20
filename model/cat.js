const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    year: { type: Number },
    month: { type: Number },
    weight: { type: Number },
    image: { type: String },
    food: { type: String, default: "normal" },
    portion: { type: Number },
    vaccine: [{
        name: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        times: { type: Number },
        status: { type: String, default: "normal" },
    }]
});

module.exports = mongoose.model('Cat', catSchema);