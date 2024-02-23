const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userResponseSchema = new Schema({
    quizId: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    userId: String,
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question', 
        required: true
    },
    selectedOptionId: Number,
    score: Number,
});

module.exports = mongoose.model('UserResponse', userResponseSchema);
