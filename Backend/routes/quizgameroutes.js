const express = require('express');
const{addQuiz, displayQuiz,deleteQuiz,editcorrectanswer} = require('../controllers/Quizcontroller.js');

const router = express.Router();

router.post('/addquiz',addQuiz);
router.get('/displayquiz',displayQuiz);
router.delete('/deletequiz/:id',deleteQuiz);
router.patch('/updatequiz/:id',editcorrectanswer);

module.exports = router;