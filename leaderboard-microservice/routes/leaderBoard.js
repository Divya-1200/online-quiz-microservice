const express = require('express');
const Leaderboard = require('../models/leaderBoardModel');


router.patch('/:quizId/:userId', async (req, res) => {
    try {
        const { quizId, userId, score } = req.body;
        // const leaderboardEntry = await Leaderboard.create({ quizId, userId, score });
        res.status(201).json(leaderboardEntry);
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
