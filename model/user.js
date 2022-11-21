const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, default: null, unique: true, sparse: true },
    password: { type: String, default: null },
    token: { type: String },
    permission: { type: Number, default: 1 }
});

module.exports = mongoose.model('user', userSchema);
