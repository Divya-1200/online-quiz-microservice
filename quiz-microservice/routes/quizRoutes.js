const express = require('express');
const router = express.Router();
const {fetchQuestions, createQuestions, updateQuestions, deleteQuestions} = require('../controllers/quizController');

router.route("/").get(fetchQuestions);
router.route("/").post(createQuestions);
router.route("/").put(updateQuestions);
router.route("/").delete(deleteQuestions);


module.exports = router;
