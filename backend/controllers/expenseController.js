const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Expense = require('../models/expenseModel');

// @desc GET all expenses
// @route /api/expenses
// @access PRIVATE
const getExpenses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const expenses = await Expense.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  res.status(200).json(expenses);
});

// @desc    Create new expense
// @route   POST /api/expenses/
// @access  PRIVATE
const createExpense = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    res.status(400);
    throw new Error('Please add an amount');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const expense = await Expense.create({ user: req.user.id, amount });

  res.status(201).json(expense);
});

// @desc    Delete an existing expense
// @route   DELETE /api/expenses/:id
// @access  PRIVATE
const deleteExpense = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error('Expense not found');
  }

  if (expense.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await expense.remove();

  res.status(200).json({ success: true });
});

module.exports = { getExpenses, createExpense, deleteExpense };
