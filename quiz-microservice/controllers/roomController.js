const asyncHandler = require("express-async-handler");
const Room =  require("../models/roomModel");


const getRooms = asyncHandler(async(req, res) => {
    try {
        // Fetch all rooms from the database
        const rooms = await Room.find();

        res.json(rooms); // Respond with the fetched rooms
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }

});

const getRoom = asyncHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

const createRoom = asyncHandler(async(req, res) =>{
    try {
        const { roomId, quiz, participants } = req.body;
        const newRoom = new Room({
            roomId,
            quiz,
            participants
        });
        const savedRoom = await newRoom.save();

        // res.status(201).json(savedRoom); 
        const result = {
            statusCode: 201,
            status: 'success',
            message: 'Room created successfully',
        };
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
});

const updatedRoom = asyncHandler(async(req, res) =>{
    const { id } = req.params;
    const { participants } = req.body;
    try {
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        participants.forEach(({ id: participantId, status }) => {
            const participantIndex = room.participants.findIndex(participant => participant.id === participantId);
            if (participantIndex === -1) {
                room.participants.push({ id: participantId, status });
            } else {
                room.participants[participantIndex].status = status;
            }
        });
        const result = {
            statusCode: 200,
            status: 'success',
            message: 'Room updated successfully',
        };
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


const deleteRoom = asyncHandler(async(req, res) =>{
    const { id } = req.params;

    try {
        const deletedRoom = await Room.findByIdAndRemove(id);

        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        const result = {
            statusCode: 200,
            status: 'success',
            message: 'Room deleted successfully',
        };
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});


module.exports = {getRooms, getRoom, updatedRoom, createRoom, deleteRoom};