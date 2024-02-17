const express = require('express');
const router = express.Router();
const { createUserResponse, getUserResponsesByUserId, updateUserResponse, deleteUserResponse, deleteAllUserResponsesByQuizId } = require('../controllers/userResponseController');


// router.route("/").get(getUserResponses);
router.route("/:userid").get(getUserResponsesByUserId);
router.route("/").post(createUserResponse);
router.route("/:id").patch(updateUserResponse);
router.route("/:id").delete(deleteUserResponse);
router.route("/:quizid").delete(deleteAllUserResponsesByQuizId);

module.exports = router;