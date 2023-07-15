const mongoose = require('mongoose');

const course = new mongoose.Schema({
    name: { type: String, default: null },
    logo: { type: String, default: null },
    price: { type: Number, default: 0},
    createdAt: { type: Date, default: Date.now }
});

const courseSchema = mongoose.model('course', course);
module.exports = courseSchema;