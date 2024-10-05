const express = require('express');

const router = express.Router();

const{createTask,getTasks,getSingleTask,deleteTask} = require('../controllers/taskController');
// const { deleteOne } = require('../models/TaskModel');

router.post("/",createTask);
router.get("/",getTasks);
router.get("/:id",getSingleTask);
router.delete("/:id",deleteTask);


module.exports = router;