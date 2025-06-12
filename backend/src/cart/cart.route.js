const express = require('express');
const router = express.Router();
const Cart = require('./cart.model');
const auth = require('../middleware/verifyAdminToken');
// Get user's cart
router.get('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.book');
  res.json(cart || { items: [] });
});

// Add/update item in cart
router.post('/add', auth, async (req, res) => {
  const { bookId, quantity } = req.body;
  if (!bookId || !quantity || quantity < 1) return res.status(400).json({ msg: 'Invalid data' });

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = new Cart({ user: req.user.id, items: [] });

  const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ book: bookId, quantity });
  }
  await cart.save();
  res.json(cart);
});

// Clear cart
router.post('/clear', auth, async (req, res) => {
  await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });
  res.json({ msg: 'Cart cleared' });
});

module.exports = router;