const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    inputText: {
      type: String,
      require: true,
    },
    outputText: {
      type: String,
      require: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
