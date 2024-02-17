const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roomSchema = new Schema({

    quizId: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    participants: [{
        id: String,
        status: {
            type: String,
            default: 'notjoined'
        }
    }]
});

module.exports = mongoose.model('Room', roomSchema);
