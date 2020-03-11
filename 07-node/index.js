const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

const { PORT_NUMBER, MONGO_URL } = require("./utils/variables");
const userRouter = require("./routes/user");
const notesRouter = require("./routes/notes");

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const app = express();

app.use(cors());

app.use(express.json());
app.use("/users", userRouter);
app.use("/notes", notesRouter);

var server = app.listen(PORT_NUMBER, function() {
  console.log(`listening for requests on port ${PORT_NUMBER}`);
});

// Static files
app.use(express.static("node-view/build"));

// Socket setup & pass server
// var io = socket(server);
// io.on("connection", socket => {
//   console.log("made socket connection", socket.id);

//   // Handle chat event
//   socket.on("chat", function(data) {
//     // console.log(data);
//     io.sockets.emit("chat", data);
//   });

//   // Handle typing event
//   socket.on("typing", function(data) {
//     socket.broadcast.emit("typing", data);
//   });
// });

// additional features:
// 1. Expiring JWT token (configurable login timeout)
// 2. Hashed passwords in a DB
// 3. Template responses used
// 4. Display weather for 3rd perty libraries - see https://holovkoserhii.github.io/weather/

// *1. User is able to register account in the system;
// *2. User is able to login into the system;
// *3. User can create, view, update, delete personal notes;
// *4. User can manage personal notes only when logged in;
// *5. User can see only personal notes;
// *6. User can see total number of personal notes;
// *7. User can delete his account, view account info,
// *8. User can Update account info when logged in;
// 9. User can see other users in system and their notes count;
