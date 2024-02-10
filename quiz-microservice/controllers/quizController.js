const asyncHandler = require("express-async-handler");
const Quiz =  require("../models/quizModel");

const fetchQuestions = asyncHandler(async(req, res) => {
    try {
        const questions = "hello, Jazu";
        res.json({ success: true, data: questions });
    } catch (error) {  
        res.status(500).json({ success: false, error: error.message });
    }
});

const createQuestions = asyncHandler(async(req, res) => {

    try{
        const questions = "hello, Jazu";
        res.json({ success: true, data: questions });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }

});

const updateQuestions = asyncHandler(async(req, res) => {
    try{
        const questions = "hello, Jazu";
        res.json({ success: true, data: questions });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const deleteQuestions = asyncHandler(async(req, res) => {
    try{
        const questions = "hello, Jazu";
        res.json({ success: true, data: questions });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = {fetchQuestions, createQuestions, updateQuestions, deleteQuestions} ;