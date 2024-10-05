const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    originalText: {
        type: String,
        required: true,
      },
    translatedText: {
        type: String,
        required: true,
      },
    dateCreated: {
        type: Date,
        default: Date.now,
      },

})

module.exports=mongoose.model(
    "BookMarkModel",//file name
    bookmarkSchema  //function name
)
