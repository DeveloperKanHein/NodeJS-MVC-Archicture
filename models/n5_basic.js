const mongoose = require('mongoose');

const N5Basic = new mongoose.Schema({
    courseId: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    introduction: [
        {
            instruction: { type: String, default: null },
            audioLink: { type: String, default: null },
            paragraph: { type: String, default: null }
        }
    ],
    basicAccent: [
        {
            instruction: { type: String, default: null },
            audioLink: { type: String, default: null },
            paragraph: { type: String, default: null },
            photoLink: { type: String, default: null }
        }
    ],
    
    hiragana: [
        {
            instruction: { type: String, default: null },
            videoLink: { type: String, default: null },
            paragraph: { type: String, default: null }
        }
    ],
    
    katakana: [
        {
            instruction: { type: String, default: null },
            videoLink: { type: String, default: null },
            paragraph: { type: String, default: null }
        }
    ],
    otherAccent: [
        {
            instruction: { type: String, default: null },
            audioLink: { type: String, default: null },
            paragraph: { type: String, default: null },
            photoLink: { type: String, default: null }
        }
    ],
    hiraganaOtherAccent: [
        {
            instruction: { type: String, default: null },
            videoLink: { type: String, default: null },
            paragraph: { type: String, default: null }
        }
    ],

    katakanaOtherAccent: [
        {
            instruction: { type: String, default: null },
            videoLink: { type: String, default: null },
            paragraph: { type: String, default: null }
        }
    ],

    writingGuide: [
        {
            instruction: { type: String, default: null },
            pdfLink: { type: String, default: null }
        }
    ],

});

const basicShcema = mongoose.model('n5basic', N5Basic);
module.exports = basicShcema;