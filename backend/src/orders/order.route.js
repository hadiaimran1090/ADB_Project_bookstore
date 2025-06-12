const express = require('express');
const { createAOrder, getOrderByEmail, getAllOrders } = require('./order.controller');
const Notification = require('../notifications/notification.model');

const router = express.Router();

// create order endpoint
router.post("/", async (req, res) => {
    try {
        // Call your existing order creation logic
        const order = await createAOrder(req, res, true); // true for internal call, see note below

        // Create notification for admin
        await Notification.create({
            message: `New order placed by user: ${req.body.email || 'Unknown User'}`
        });

        // If createAOrder already sends response, skip this
        if (!res.headersSent) {
            res.status(201).json(order);
        }
    } catch (error) {
        res.status(500).json({ message: "Order creation or notification failed", error: error.message });
    }
});

// get orders by user email 
router.get("/email/:email", getOrderByEmail);

// get all orders for admin
router.get("/", getAllOrders);
module.exports = router;
// const express = require('express');
// const { createAOrder, getOrderByEmail, getAllOrders } = require('./order.controller');

// const router = express.Router();

// // create order endpoint
// router.post("/", createAOrder);

// // get orders by user email 
// router.get("/email/:email", getOrderByEmail);

// // get all orders for admin
// router.get("/", getAllOrders);

// module.exports = router;
// // const express = require('express');
// // const { createAOrder, getOrderByEmail } = require('./order.controller');

// // const router =  express.Router();

// // // create order endpoint
// // router.post("/", createAOrder);

// // // get orders by user email 
// // router.get("/email/:email", getOrderByEmail);

// // module.exports = router;