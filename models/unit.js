const mongoose = require('mongoose');

const unit = new mongoose.Schema({
    courseId: { type: String, default: null },
    title: { type: String, default: null },
    label1: { type: String, default: null },
    label2: { type: String, default: null },
    unitNo: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    vocabularies: [
        {
            instruction: { type: String, default: null },
            audioLink: { type: String, default: null },
            words: [
                {
                    jp: { type: String, default: null },
                    en: { type: String, default: null },
                    mm: { type: String, default: null },
                }
            ],
        }
    ],
    grammars: [
        {
            instruction: { type: String, default: null },
            videoLink: { type: String, default: null },
            paragraph: { type: String, default: null }
        }
    ],
    conversations: [
        {
            instruction: { type: String, default: null },
            audioLink: { type: String, default: null },
            pdfLink: { type: String, default: null }
        }
    ],
    renshuus: [
        {
            instruction: { type: String, default: null },
            videoLink: { type: String, default: null },
            paragraph: { type: String, default: null }
        }
    ],
    exercises: [
        {
            instruction: { type: String, default: null },
            videoLink: { type: String, default: null },
            paragraph: { type: String, default: null }
        }
    ],
    kanjis: [
        {
            instruction: { type: String, default: null },
            videoLink: { type: String, default: null },
            paragraph: { type: String, default: null }
        }
    ],
    quiz: {
        matching: [
            {
                match: [
                    {
                        a: { type: String, default: null},
                        b: { type: String, default: null}
                    }
                ]
            }
        ],
        
        multipleChoiceWithSentence: [
            {
                question: { type: String, default: null },
                correctAnswer: { type: String, default: null },
                answers: [
                    {
                        prounced: { type: String, default: " "},
                        word: { type: String, default: null},
                        isAnswer: { type: Boolean, default: false}
                    }
                ]
            }
        ],
        multipleChoiceWithConversation: [
            {
                question: { type: String, default: null },
                correctAnswer: { type: String, default: null },
                answers: [
                    {
                        prounced: { type: String, default: " "},
                        word: { type: String, default: null},
                        isAnswer: { type: Boolean, default: false}
                    }
                ]
            }
        ],
        multipleChoiceWithParagraph: [
            {
                question: { type: String, default: null },
                correctAnswer: { type: String, default: null },
                answers: [
                    {
                        prounced: { type: String, default: " "},
                        word: { type: String, default: null},
                        isAnswer: { type: Boolean, default: false}
                    }
                ]
            }
        ],
    },
});

const unitShcema = mongoose.model('unit', unit);
module.exports = unitShcema;