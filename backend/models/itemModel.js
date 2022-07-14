const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please add a name'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
      required: [true, 'Please add the name of the user who created this item'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Item', itemSchema);
