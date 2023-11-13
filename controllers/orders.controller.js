const Order = require('../models/order.model');
const User = require('../models/user.model');

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render('customer/orders/all-orders', {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  // Assuming cart is available in the request or session
  const cart = req.session.cart; // Make sure to adjust this based on how you store the cart

  if (!cart) {
    return res.status(400).send('Cart is empty'); // Handle the case where the cart is empty
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  res.redirect('/orders');
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
};