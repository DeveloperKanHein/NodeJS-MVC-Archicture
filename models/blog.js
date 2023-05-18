const mongoose = require('mongoose');

const blog = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    title: { type: String, default: null },
    description: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

const blogSchema = mongoose.model('blog', blog);
module.exports = blogSchema;