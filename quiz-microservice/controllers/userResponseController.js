const UserResponse = require('../models/userResponseModel');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const createUserResponse = async (req, res) => {
   
    const protoDefinition = protoLoader.loadSync("/Users/divyap/divya/home-workshop/microservice-project/leaderboard-microservice/leaderboard.proto");  
    const leaderboardProto = grpc.loadPackageDefinition(protoDefinition).leaderboard;
    const client = new leaderboardProto.LeaderboardService(`0.0.0.0:50051`, grpc.credentials.createInsecure());    
    const {quizId, userId, questionId, selectedOptionId} = req.body;
    try {
        const saveUserResponse = new UserResponse({
            quizId,
            userId,
            questionId, 
            selectedOptionId
        });
        await saveUserResponse.save();
        const request = {
            quizId: quizId, // Extract data from your route or application state
            userId: userId,
            score: 100,
        };
        try {
            await client.updateLeaderboard(request);
            res.json(result);
        } catch (error) {
            console.error('Error updating leaderboard:', error);
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
