const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question =  require("../models/questionModel");

const quizSchema = new Schema({
    title: String,
    adminUserId: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
