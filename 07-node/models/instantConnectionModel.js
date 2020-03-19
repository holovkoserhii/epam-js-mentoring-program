const mongoose = require("mongoose");

const instantConnectionSchema = mongoose.Schema({
  connectionId: {
    type: String,
    default: ""
  },
  login: {
    type: String,
    default: ""
  },
  notesCount: {
    type: Number,
    default: 0
  }
});

const InstantConnection = mongoose.model(
  "InstantConnection",
  instantConnectionSchema
);

module.exports = InstantConnection;
