const express = require('express');
const router = express.Router();
const {fetchQuizzes,fetchQuiz, createQuestions, updateQuestions, deleteQuestions} = require('../controllers/quizController');

router.route("/").get(fetchQuizzes);
router.route("/:id").get(fetchQuiz);
router.route("/").post(createQuestions);
router.route("/:id").patch(updateQuestions);
router.route("/:id").delete(deleteQuestions);


module.exports = router;
