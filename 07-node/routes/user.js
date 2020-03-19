const express = require("express");
const router = express.Router();

const { LOGIN_FAILED_ERROR_MESSAGE } = require("../utils/variables");
const { authMiddleware, logRequestInConsole } = require("../utils/utils");
const User = require("../models/usersModel");

router.post("/register", logRequestInConsole, async (req, res) => {
  try {
    const user = new User({ ...req.body, createdAt: Date.now() });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token, created: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/login", logRequestInConsole, async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findByCredentials({ login, password });
    if (!user) {
      return res.status(401).json({ error: LOGIN_FAILED_ERROR_MESSAGE });
    }
    const token = await user.generateAuthToken();
    res.status(200).json({ user, token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/", authMiddleware, logRequestInConsole, async (req, res) =>
  res.status(200).json(req.user)
);

router.get("/getAllUsers", logRequestInConsole, async (req, res) => {
  try {
    const users = await User.find({});
    const formattedUsers = users.map(user => ({
      name: user.login,
      totalNotes: user.noteIds.length
    }));
    res.status(200).json({ userList: formattedUsers });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get(
  "/totalNotes",
  authMiddleware,
  logRequestInConsole,
  async (req, res) =>
    res.status(200).json({ totalNotes: req.user.noteIds.length })
);

router.delete("/", logRequestInConsole, authMiddleware, async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findByCredentials({ login, password });
    if (!user) {
      return res.status(401).json({ error: LOGIN_FAILED_ERROR_MESSAGE });
    }
    await User.deleteOne(user);
    res.status(200).json({ deleted: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.patch("/", authMiddleware, logRequestInConsole, async (req, res) => {
  try {
    const newData = req.body;
    await User.findByIdAndUpdate(req.user._id, { ...newData });
    res.status(200).json({ updated: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
