const asyncHandler = require("express-async-handler");
const Quiz =  require("../models/quizModel");
const Question = require("../models/questionModel");
const fetchQuestions = asyncHandler(async(req, res) => {
    try {
        const quizzes = await Quiz.find().populate('questions');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const createQuestions = asyncHandler(async(req, res) => {
    try {
        const { title, adminUserId, questions } = req.body;

        // Create an array to hold references to the questions
        const questionIds = [];

        // Iterate over the questions array from the request body
        for (const questionData of questions) {
            // Create a new question document
            const newQuestion = new Question({
                text: questionData.text,
                options: questionData.options,
                correctOption: questionData.correctOption
            });
            const savedQuestion = await newQuestion.save();
            questionIds.push(savedQuestion._id);
        }
        const newQuiz = new Quiz({
            title,
            adminUserId,
            questions: questionIds
        });
        const savedQuiz = await newQuiz.save();
        savedQuiz.populate('questions');
        res.status(201).json(savedQuiz); 
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
});

const updateQuestions = asyncHandler(async(req, res) => {
    const { id } = req.params;
    console.log("hola");
    try {
        let quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        if (req.body.title) {
            quiz.title = req.body.title;
        }
        if (req.body.adminUserId) {
            quiz.adminUserId = req.body.adminUserId;
        }
        if (req.body.questions) {
            for (const questionData of req.body.questions) {
                console.log("here in ques",questionData);
                    let question = await Question.findById(questionData._id);
                    if (!question) {
                        return res.status(404).json({ message: `Question with ID ${questionData._id} not found` });
                    }
                    if (questionData._delete) {
                        console.log("here in ques delete",questionData);
                        quiz.questions.pull(questionData._id);
                        // await question.remove();
                    } else {
                        if(questionData._id){
                            if (questionData.text) {
                                question.text = questionData.text;
                            }
                            if (questionData.options) {
                                question.options = questionData.options;
                            }
                            if (questionData.correctOption) {
                                question.correctOption = questionData.correctOption;
                            }
                            await question.save();
                            if (!quiz.questions.includes(questionData._id)) {
                                quiz.questions.push(questionData._id);
                            }
                        }
                        else{
                            const newQuestion = new Question({
                                text: questionData.text,
                                options: questionData.options,
                                correctOption: questionData.correctOption
                            });
                            const savedQuestion = await newQuestion.save();
                            quiz.questions.push(savedQuestion._id);
                        }   
                    }
                }    
            }
        await quiz.save();
        const result = {
            statusCode: 200,
            status: 'success',
            message: 'Quiz updated successfully',
        };
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
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