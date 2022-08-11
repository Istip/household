const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');

router.use(protect);

router.get('/', getItems);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
