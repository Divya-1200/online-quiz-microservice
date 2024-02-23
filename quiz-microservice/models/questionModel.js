const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    optionId: Number,
    text: String
});

const questionSchema = new Schema({
    questionId: Schema.Types.ObjectId,
    text: String,
    options: [optionSchema],
    correctOption: Number,
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
