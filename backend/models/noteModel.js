const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    text: {
      type: String,
      require: [true, 'Please add text for your note'],
    },
    description: {
      type: String,
    },
    createdBy: {
      type: String,
      required: [true, 'Please add the name of the user who created this note'],
    },
    comments: {
      createdBy: {
        type: String,
      },
      createdAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);
