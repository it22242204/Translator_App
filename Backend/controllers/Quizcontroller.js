// const jwt = require('jsonwebtoken');
const QuizModel = require("../models/Quizmodel.js");

//insert questions
const addQuiz = async(req,res,next)=>{
    try{
        const{question,answerone,answertwo,answerthree,correctanswer}= req.body

        if(!question || !answerone || !answertwo || !answerthree || !correctanswer){
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newQuiz = new QuizModel({
            question,
            answerOne: answerone,
            answerTwo: answertwo,
            answerThree: answerthree,
            correctAnswer : correctanswer,
        });

        await newQuiz.save();

        res.status(201).json({success: true, message: "Question added successfully",data: newQuiz});
    }catch(error){
        console.error("Error adding question",error);
        res.status(500).json({success: false,message: "Internal sercer error"});

    }
};

const displayQuiz = async (req,res,next) => {

    try{
        const quiz = await QuizModel.find();
        res.status(200).json(quiz);
    }catch(error){
        console.error("Error fetching quiz data",error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const deleteQuiz = async(req,res,next)=>{
    const{id} = req.params;
    const deleteObj = await  QuizModel.findByIdAndDelete({_id:id});
    return res.status(200).json({data: deleteObj});
};

const editcorrectanswer = async(req,res,next)=>{
    const{correctanswer} = req.body;
    const{id} = req.params;

    const updateanswer = await QuizModel.findByIdAndUpdate(
        id,
        {
            $set:{
                correctAnswer : correctanswer
            },
        },
        {new:true}
    );

    return res.json({message: "Correct answer updated successfully",data:updateanswer,});

}


module.exports = {addQuiz,displayQuiz,deleteQuiz,editcorrectanswer};