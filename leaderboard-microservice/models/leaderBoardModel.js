const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    quizId: String,
    userId: String,
    score: { type: Number, required: true },
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
