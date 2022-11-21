const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, default: null },
    description: { type: String, default: null },
    image: { type: String },
    formular: [{
        form_name: { type: String },
        form_description: { type: String },
        kgCal: { type: Number },
        image: { type: String },
    }],
});

module.exports = mongoose.model('Food', foodSchema);