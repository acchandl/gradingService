const express = require('express');
const questions = require('../controllers/worksheetQuestions');
const router = express.Router();

router.get('/', questions.getQuestions);
router.get('/:id', questions.getQuestionsByID);

router.post('/', questions.createQuestions);

module.exports = router;