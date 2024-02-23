const UserResponse = require('../models/userResponseModel');
const axios = require('axios');
const { createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion } = require('../controllers/questionController');


const createUserResponse = async (req, res) => {
    console
    const {quizId, userId, questionId, selectedOptionId} = req.body;
    let score=0
    const answer  = await getQuestionById(questionId);
    if(answer.correctOption === selectedOptionId)
    {
        score = 1;            
    }
    try {
        const saveUserResponse = new UserResponse({
            quizId,
            userId,
            questionId, 
            selectedOptionId,
            score,
        });
        await saveUserResponse.save();   
        const request = {
            score: score,
        };
        try {
            await axios.patch(`http://localhost:3005/api/leaderboard/${quizId}/${userId}`, request);        
        } catch (error) {
            console.error('Error updating leaderboard:', error);
            throw error;
        }    
        const result = {
            statusCode: 201,
            status: 'success',
            message: 'response recorded successfully',
        };
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getUserResponsesByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const userResponses = await UserResponse.find({ userId });
        res.json(userResponses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateUserResponse = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUserResponse = await UserResponse.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUserResponse) {
            return res.status(404).json({ message: 'User response not found' });
        }
        res.json(updatedUserResponse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUserResponse = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUserResponse = await UserResponse.findByIdAndDelete(id);
        if (!deletedUserResponse) {
            return res.status(404).json({ message: 'User response not found' });
        }
        res.json({ message: 'User response deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllUserResponsesByQuizId = async (req, res) => {
    const { quizId } = req.params;
    try {
        const deletedUserResponses = await UserResponse.deleteMany({ quizId });
        res.json({ message: `${deletedUserResponses.deletedCount} user responses deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createUserResponse, getUserResponsesByUserId, updateUserResponse, deleteUserResponse, deleteAllUserResponsesByQuizId };
