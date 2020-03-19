const jwt = require("jsonwebtoken");
const colors = require("colors/safe");
const dotenv = require("dotenv");
dotenv.config();

const {
  NOT_AUTHORIZED_ERROR_MESSAGE,
  methodToMessageMapper
} = require("../utils/variables");
const User = require("../models/usersModel");
const InstantConnection = require("../models/instantConnectionModel");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const data = jwt.verify(token, process.env.secretJWT);
    const user = await User.findOne({ _id: data._id, "tokens.token": token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: NOT_AUTHORIZED_ERROR_MESSAGE });
  }
};

exports.logRequestInConsole = async (req, res, next) => {
  const message = req.method;
  const color = methodToMessageMapper[req.method];
  console.log(colors[color](`${message} method is executed`));
  next();
};

exports.checkNotes = async login => {
  const user = await User.findOne({ login });
  if (!user) return null;
  return user.noteIds.length;
};

exports.getAllInstantConnections = async connectionIds => {
  const connections = await InstantConnection.find({});
  let activeConnections = [];
  for (let i = 0; i < connections.length; i++) {
    if (!connectionIds.includes(connections[i].connectionId)) {
      await InstantConnection.findOneAndDelete({
        connectionId: connections[i].connectionId
      });
    } else {
      activeConnections.push(connections[i]);
    }
  }
  return activeConnections;
};
