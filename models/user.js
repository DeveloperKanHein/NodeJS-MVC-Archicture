const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, unique : true },
    password: { type: String },
    createdAt: { type: Date, default: Date.now }
});
const userSchema = mongoose.model('user', user);
module.exports = userSchema;