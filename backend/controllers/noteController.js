const asyncHandler = require('express-async-handler');

const Note = require('../models/noteModel');

// @desc GET all notes
// @route /api/notes
// @access PRIVATE
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });

  res.status(200).json(notes);
});

// @desc    Create new note
// @route   POST /api/notes
// @access  PRIVATE
const createNote = asyncHandler(async (req, res) => {
  const { text, createdBy } = req.body;

  if (!text || !createdBy) {
    res.status(400);
    throw new Error(
      'Please add note text and the user who created the item!'
    );
  }

  const note = await Note.create({
    text,
    createdBy,
  });

  res.status(201).json(note);
});

// @desc    Update an existing note
// @route   PUT /api/notes/:id
// @access  PRIVATE
const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Note.findById(id);

  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }

  const updatedNote = await Note.findByIdAndUpdate(id, req.body);

  res.status(200).json(updatedNote);
});

// @desc    Delete an existing note
// @route   DELETE /api/notes/:id
// @access  PRIVATE
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Note.findById(id);

  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }

  const deletedNote = await Note.findByIdAndDelete(id);

  res.status(200).json(deletedNote);
});

module.exports = { getNotes, createNote, updateNote, deleteNote };
