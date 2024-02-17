const express = require('express');
const router = express.Router();
const {getRooms, getRoom, updatedRoom, createRoom, deleteRoom} =  require('../controllers/roomController');

router.route("/").get(getRooms);
router.route("/:id").get(getRoom);
router.route("/").post(createRoom);
router.route("/:id").patch(updatedRoom);
router.route("/:id").delete(deleteRoom);


module.exports = router;