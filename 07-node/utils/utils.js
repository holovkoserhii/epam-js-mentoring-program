const jwt = require("jsonwebtoken");

const {
  secretJWT,
  NOT_AUTHORIZED_ERROR_MESSAGE
} = require("../utils/variables");
const User = require("../models/usersModel");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const data = jwt.verify(token, secretJWT);
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
