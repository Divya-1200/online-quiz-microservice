const asyncHandler = require("express-async-handler");
const Quiz =  require("../models/quizModel");
const Question = require("../models/questionModel");


const fetchQuizzes = asyncHandler(async(req, res) => {
    try {
        const quizzes = await Quiz.find().populate('questions');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const fetchQuiz= asyncHandler(async(req, res) => {
    const { id } = req.params;

    try {
        let quizzes;
        if (id) {
            const quiz = await Quiz.findById(id).populate('questions');
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz not found' });
            }
            quizzes = [quiz];
        } else {
            quizzes = await Quiz.find();
        }
        res.json(quizzes); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const createQuestions = asyncHandler(async(req, res) => {
    try {
        const { title, adminUserId, questions } = req.body;
        const questionIds = [];
        for (const questionData of questions) {
            let optionNumber = 1;
            const optionsArray = [];
            for (const option of questionData.options) {
                optionsArray.push({
                    optionId:optionNumber++,  
                    text: option.text,
                });
            }
            const newQuestion = new Question({
                text: questionData.text,
                options: optionsArray,
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
                    let question = await Question.findById(questionData._id);
                    if (!question) {
                        return res.status(404).json({ message: `Question with ID ${questionData._id} not found` });
                    }
                    if (questionData._delete) {
                        quiz.questions.pull(questionData._id);
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
    const { id } = req.params; 
    try {
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        await quiz.remove();
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = {fetchQuizzes, fetchQuiz, createQuestions, updateQuestions, deleteQuestions} ;