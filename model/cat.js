const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: { type: String, default: null },
    year: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    email: { type: String, default: null },
    vaccine: {
        vac_id: { type: Number, default: 0 },
        vac_date: { type: Date, default: Date.now }
    },
});

module.exports = mongoose.model('Cat', catSchema);