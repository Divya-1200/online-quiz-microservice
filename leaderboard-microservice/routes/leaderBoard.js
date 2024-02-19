const express = require('express');
const Leaderboard = require('../models/leaderBoardModel');


async function updateLeaderboard() {
    // const { quizId, userId, score } = call.request;
    try {
        // Update leaderboard
        // const leaderboardEntry = await Leaderboard.create({ quizId, userId, score });
        // callback(null, leaderboardEntry);
        console.log("vanakamm da mapla");
        console.log("thanks to the lord");
    } catch (error) {
        callback(error);
    }
}

module.exports = {updateLeaderboard};
