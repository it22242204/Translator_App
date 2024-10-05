const Note=require("../models/Notemodel");

//displaying all notes
const getAllNotes=async(req,res,next)=>
{
    let Notes

    //get all notes
    try{
        Notes=await Note.find();//finding every note and displaying
    }catch(err){
        console.log(err);
    }

    //not found
    if(!Notes){
        return res.Status(404).json({message:"note not found"});
    }

    //display all notes
    return res.status(200).json({Notes});
};
//http://localhost:5000/notes=>testing above get method using this url in the postman

//inserting notes
const addNotes=async(req,res,next)=>{
    const{name,note,grammer,complexsentence,description}=req.body;

    let notes;
   
    try{
        notes=new Note({name,note,grammer,complexsentence,description});
        await notes.save();//save the inserted details in the database
    }catch(err){
        console.log(err);
    }

    //not insert notes
    if(!notes){
        return res.status(404).json({message:"unable to add note"});
    }
    return res.status(200).json({notes});

}
//http://localhost:5000/notes=>testing above post method using this url in the postman

//get by ID
const getById=async(req,res,next)=>{
    const id=req.params.id;//finding the particular note

    let note;

    try{
        note=await Note.findById(id);
    }catch(err){
        console.log(err);
    }
    //not available users
    if(!note){
        return res.status(404).json({message:"Note not found"});
    }
    return res.status(200).json({note});

}
//http://localhost:5000/notes/id=>testing above get method using this url in the postman


//update note details
const updateNote=async(req,res,next)=>{
    const id=req.params.id;
    const {name,note,grammer,complexsentence,description}=req.body;

    let notes;

    try{
        notes=await Note.findByIdAndUpdate(id,{name:name,note:note,grammer:grammer,complexsentence:complexsentence,description:description});//finding the particular note and updating
        notes=await notes.save();//save the particular updated details
    }catch(err){
        console.log(err);
    }

    //not available users
    if(!notes){
        return res.status(404).json({message:"unable to update note details"});
    }
    return res.status(200).json({notes});

}
//http://localhost:5000/notes/update/id

//delete user details
const deleteNote=async(req,res,next)=>{
    const id=req.params.id;

    let note;

    try{
        note=await Note.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!note){
        return res.status(404).json({message:"unable to update note details"});
    }
    return res.status(200).json({note});
}

//exporting the functions
exports.getAllNotes=getAllNotes;
exports.addNotes=addNotes;
exports.getById=getById;
exports.updateNote=updateNote;
exports.deleteNote=deleteNote;