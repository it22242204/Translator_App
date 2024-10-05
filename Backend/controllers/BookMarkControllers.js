const BookMarkModel = require("../models/BookMarkModel");

// Displaying all bookmarks
const getAllBookmarks = async (req, res, next) => {
  let bookmarks;

  try {
    // Finding every bookmark and displaying
    bookmarks = await BookMarkModel.find();
  } catch (err) {
    console.log(err);
  }

  // Not found
  if (!bookmarks) {
    return res.status(404).json({ message: "Bookmarks not found" });
  }

  // Display all bookmarks
  return res.status(200).json({ bookmarks });
};

// Example testing URL in Postman: GET http://localhost:5000/BookMark

// Inserting a bookmark
const addBookmark = async (req, res, next) => {
  const { name, originalText, translatedText } = req.body;

  let bookmark;

  try {
    bookmark = new BookMarkModel({ name, originalText, translatedText });
    await bookmark.save(); // Save the inserted details in the database
  } catch (err) {
    console.log(err);
  }

  // If unable to insert bookmark
  if (!bookmark) {
    return res.status(404).json({ message: "Unable to add bookmark" });
  }

  return res.status(200).json({ bookmark });
};
// Example testing URL in Postman: POST http://localhost:5000/BookMark

// Get bookmark by ID
const getBookmarkById = async (req, res, next) => {
  const id = req.params.id; // Finding the particular bookmark

  let bookmark;

  try {
    bookmark = await BookMarkModel.findById(id);
  } catch (err) {
    console.log(err);
  }

  // If bookmark not found
  if (!bookmark) {
    return res.status(404).json({ message: "Bookmark not found" });
  }

  return res.status(200).json({ bookmark });
};
// Example testing URL in Postman: GET http://localhost:5000/BookMark/:id

// Update bookmark details
const updateBookmark = async (req, res, next) => {
  const id = req.params.id;
  const { name, originalText, translatedText } = req.body;

  let bookmark;

  try {
    bookmark = await BookMarkModel.findByIdAndUpdate(id, {
      name,
      originalText,
      translatedText,
    }); // Finding the particular bookmark and updating

    bookmark = await bookmark.save(); // Save the updated details
  } catch (err) {
    console.log(err);
  }

  // If unable to update bookmark
  if (!bookmark) {
    return res.status(404).json({ message: "Unable to update bookmark details" });
  }

  return res.status(200).json({ bookmark });
};
// Example testing URL in Postman: PUT http://localhost:5000/BookMark/:id

// Delete a bookmark
const deleteBookmark = async (req, res, next) => {
  const id = req.params.id;

  let bookmark;

  try {
    bookmark = await BookMarkModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  // If unable to delete bookmark
  if (!bookmark) {
    return res.status(404).json({ message: "Unable to delete bookmark" });
  }

  return res.status(200).json({bookmark});
};
// Example testing URL in Postman: DELETE http://localhost:5000/BookMark/:id

// Exporting the functions
exports.getAllBookmarks = getAllBookmarks;
exports.addBookmark = addBookmark;
exports.getBookmarkById = getBookmarkById;
exports.updateBookmark = updateBookmark;
exports.deleteBookmark = deleteBookmark;

