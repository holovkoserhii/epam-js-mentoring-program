const express = require("express");
const socket = require("socket.io");
const cors = require("cors");

const { checkNotes, getAllInstantConnections } = require("./utils/utils");
const userRouter = require("./routes/user");
const notesRouter = require("./routes/notes");
const InstantConnection = require("./models/instantConnectionModel");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/users", userRouter);
app.use("/notes", notesRouter);

var server = app.listen(process.env.PORT_NUMBER, function() {
  console.log(`listening for requests on port ${process.env.PORT_NUMBER}`);
});

app.use(express.static("public"));

const io = socket(server);

io.on("connection", async socket => {
  // console.log("socket connection established", socket.id);
  const name = socket.handshake.query.name;
  let notesCount = 0;
  if (name) {
    notesCount = await checkNotes(name);
  }
  const connection = new InstantConnection({
    connectionId: socket.id,
    login: name,
    notesCount
  });
  await connection.save();
  await balanceAllConnections();

  socket.on("message", async data => {
    await balanceAllConnections();
    io.sockets.emit("message", data);
  });

  socket.on("changeName", async data => {
    const notesCount = await checkNotes(data);
    await InstantConnection.findOneAndUpdate(
      { connectionId: socket.id },
      { login: data, notesCount: notesCount === null ? 0 : notesCount }
    );
    io.sockets.emit("notesCountFound", { name: data, notesCount });
    await balanceAllConnections();
  });

  socket.on("typing", data => {
    if (!data) data = "someone";
    socket.broadcast.emit("typing", data);
  });
});

const balanceAllConnections = async () => {
  const activeConnections = Object.keys(io.sockets.sockets);
  const connections = await getAllInstantConnections(activeConnections);
  io.sockets.emit("reportAllConnections", { connections });
};
