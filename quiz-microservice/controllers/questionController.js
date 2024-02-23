const Question = require('../models/questionModel');

// Create a question
const createQuestion = async (questionData) => {
    try {
        const question = new Question(questionData);
        const savedQuestion = await question.save();
        return savedQuestion;
    } catch (error) {
        throw error;
    }
};

// Get all questions
const getAllQuestions = async () => {
    try {
        const questions = await Question.find();
        return questions;
    } catch (error) {
        throw error;
    }
};

// Get a single question by its ID
const getQuestionById = async (questionId) => {
    try {
        console.log('questionId',questionId);
        const question = await Question.findById(questionId);
        return question;
    } catch (error) {
        throw error;
    }
};

// Update a question
const updateQuestion = async (questionId, updatedData) => {
    try {
        const question = await Question.findByIdAndUpdate(questionId, updatedData, { new: true });
        return question;
    } catch (error) {
        throw error;
    }
};

// Delete a question
const deleteQuestion = async (questionId) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(questionId);
        return deletedQuestion;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
};