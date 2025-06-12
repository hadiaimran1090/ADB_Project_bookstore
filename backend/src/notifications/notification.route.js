const express = require('express');
const router = express.Router();
const Notification = require('./notification.model');
const auth = require('../middleware/verifyAdminToken');

router.get('/', auth, async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  res.json(notifications);
});

module.exports = router;