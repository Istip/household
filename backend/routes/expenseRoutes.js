const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
} = require('../controllers/expenseController');

router.use(protect);

router.get('/', getExpenses);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
