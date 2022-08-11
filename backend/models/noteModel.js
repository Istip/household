const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: [true, 'Please add text for your comment'],
  },
  createdBy: {
    type: String,
    required: [
      true,
      'Please add the name of the user who created this comment',
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const noteSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add text for your note'],
    },
    createdBy: {
      type: String,
      required: [true, 'Please add the name of the user who created this note'],
    },
    comments: [commentSchema],
    marked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);
