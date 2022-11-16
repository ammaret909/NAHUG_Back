const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema({
    name: { type: String },
    type: [{
        cat_month: { type: Number },
        month: { type: Number },
        times: { type: Number }
    }],
});

module.exports = mongoose.model('Vaccine', vaccineSchema);