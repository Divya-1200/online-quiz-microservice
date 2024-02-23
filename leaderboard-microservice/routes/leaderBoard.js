const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/leaderBoardModel');


router.patch('/:quizId/:userId', async (req, res) => {
    try {
        const { quizId, userId } = req.params;
        const { score } = req.body;
        let leaderboardEntry = await Leaderboard.findOne({ quizId, userId });
        if (leaderboardEntry) {
            // If leaderboard entry exists, update the score
            leaderboardEntry.score+=score;
            await leaderboardEntry.save();
            res.status(200).json(leaderboardEntry);
        } else {
            // If leaderboard entry doesn't exist, create a new one
            leaderboardEntry = await Leaderboard.create({ quizId, userId, score });
            res.status(201).json(leaderboardEntry);
        }
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:quizId', async (req, res) => {
    try {
        const { quizId } = req.params;
        const leaderboardEntries = await Leaderboard.find({ quizId });
        res.json(leaderboardEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
