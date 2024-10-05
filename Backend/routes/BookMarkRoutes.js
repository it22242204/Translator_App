const express = require('express');
const router = express.Router();

const BookMark=require("../models/BookMarkModel");

const BookMarkControllers = require("../controllers/BookMarkControllers");

router.get("/",BookMarkControllers.getAllBookmarks);
router.post("/",BookMarkControllers.addBookmark);
router.put("/:id",BookMarkControllers.updateBookmark);
router.get("/:id",BookMarkControllers.getBookmarkById);
router.delete("/:id",BookMarkControllers.deleteBookmark);

module.exports = router;
