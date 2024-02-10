const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    optionId: Schema.Types.ObjectId,
    text: String
});

const questionSchema = new Schema({
    questionId: Schema.Types.ObjectId,
    text: String,
    options: [optionSchema],
    correctOption: {
        type: Schema.Types.ObjectId,
        ref: 'Option'
    }
});

const quizSchema = new Schema({
    title: String,
    adminUserId: String,
    questions: [questionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
