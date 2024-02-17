const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userResponseSchema = new Schema({
    quizId: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    userId: String,
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question', 
        required: true
    },
    selectedOptionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question.options' 
    }
});

module.exports = mongoose.model('UserResponse', userResponseSchema);
