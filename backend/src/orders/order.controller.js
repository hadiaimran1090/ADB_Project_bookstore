const Order = require("./order.model");

const createAOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// **GET ALL ORDERS for admin**
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // sab orders, latest first
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders", error);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
  getAllOrders,
};// const Order = require("./order.model");

// const createAOrder = async (req, res) => {
//   try {
//     const newOrder =  await Order(req.body);
//     const savedOrder = await newOrder.save();
//     res.status(200).json(savedOrder);
//   } catch (error) {
//     console.error("Error creating order", error);
//     res.status(500).json({ message: "Failed to create order" });
//   }
// };

// const getOrderByEmail = async (req,res) => {
//   try {
//     const {email} = req.params;
//     const orders = await Order.find({email}).sort({createdAt: -1});
//     if(!orders) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Error fetching orders", error);
//     res.status(500).json({ message: "Failed to fetch order" });
//   }
// }

// module.exports = {
//   createAOrder,
//   getOrderByEmail
// };
