const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const noteSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    note:{
        type:String,//datatype
        required:true//validate
    },
    grammer:{
        type:String,
        required:true
    },
    complexsentence:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
})

module.exports=mongoose.model(
    "NoteModel",//file name
    noteSchema //function name
)
