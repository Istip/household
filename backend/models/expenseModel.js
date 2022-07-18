const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      require: [true, 'Please add an amount'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Expense', expenseSchema);
