const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quizSchema = new Schema({

    question : {
        type : String,
        required : true
    },
    answerOne: {
        type : String,
        required : true
    },
    answerTwo: {
        type : String,
        required : true
    },
    answerThree: {
        type : String,
        required : true
    },
    correctAnswer: {
        type : String,
        required : true
    },
})

const Quiz = mongoose.model("quiz",quizSchema);

module.exports = Quiz;