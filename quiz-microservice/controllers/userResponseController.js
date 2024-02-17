const UserResponse = require('../models/userResponse');


const createUserResponse = async (req, res) => {
    try {
        const userResponse = new UserResponse(req.body);
        const savedUserResponse = await userResponse.save();
        res.status(201).json(savedUserResponse);
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
