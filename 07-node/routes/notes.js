const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../utils/utils");
const Note = require("../models/notesModel");
const User = require("../models/usersModel");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      createdAt: Date.now(),
      userId: req.user._id
    });
    await note.save();
    await User.findByIdAndUpdate(req.user._id, {
      noteIds: [...req.user.noteIds, { noteId: note._id }]
    });
    res.status(201).json({ note, created: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  const { noteIds } = req.user;
  const ids = noteIds.map(noteItem => noteItem.noteId);
  const notes = await Promise.all(ids.map(async id => await Note.findById(id)));
  res.status(200).json({ notes });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    const user = await User.findById(note.userId);
    user.noteIds = user.noteIds.filter(
      ({ noteId }) => String(noteId) !== req.params.id
    );
    await user.save();
    res.status(200).json({ deleted: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    await Note.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ updated: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
