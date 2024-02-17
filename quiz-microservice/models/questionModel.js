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
    correctOption: Number,
});
module.exports = mongoose.model('Question', questionSchema);
