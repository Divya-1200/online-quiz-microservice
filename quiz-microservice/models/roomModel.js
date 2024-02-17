const mongoose = require('mongoose');
const Schema = mongoose.Schema;
{getRooms, getRoom, updatedRoom, createRoom, deleteRoom}
const roomSchema = new Schema({

    quiz: {
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