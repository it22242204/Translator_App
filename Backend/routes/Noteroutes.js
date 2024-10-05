const express=require("express");
const router=express.Router();

//Insert Model
const Note=require("../models/Notemodel");
//Insert User Controller
const NoteController=require("../controllers/Notecontroller");

router.get("/",NoteController.getAllNotes);//displaying we use get method
router.post("/",NoteController.addNotes);//adding we use post method
router.get("/:id",NoteController.getById);//getting the details one particular note we use get method /:id should be same as in user controller getbyid function=>id=req.params.id
router.put("/:id",NoteController.updateNote);//updating the particular note details we use put method
router.delete("/:id",NoteController.deleteNote);//deleting the particular note details we use delete method
//export
module.exports=router