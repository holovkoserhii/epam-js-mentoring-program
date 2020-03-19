const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  text: {
    type: String,
    default: ""
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  }
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
