const asyncHandler = require('express-async-handler');

const Item = require('../models/itemModel');

// @desc GET all items
// @route /api/items
// @access PRIVATE
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find();

  res.status(200).json(items);
});

// @desc    Create new item
// @route   POST /api/items/
// @access  PRIVATE
const createItem = asyncHandler(async (req, res) => {
  const { name, createdBy } = req.body;

  if (!name || !createdBy) {
    res.status(400);
    throw new Error('Please add name and the user who created the item!');
  }

  const item = await Item.create({
    name,
    createdBy: req.body.createdBy,
  });

  res.status(201).json(item);
});

// @desc    Update an existing item
// @route   PUT /api/items/:id
// @access  PRIVATE
const updateItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await Item.findById(id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  const updatedItem = await Item.findByIdAndUpdate(id, req.body);

  res.status(200).json(updatedItem);
});

// @desc    Delete an existing item
// @route   DELETE /api/items/:id
// @access  PRIVATE
const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await Item.findById(id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  const deletedItem = await Item.findByIdAndDelete(id);

  res.status(200).json(deletedItem);
});

module.exports = { getItems, createItem, updateItem, deleteItem };
