const ProductControllers = require("../controllers/ProductControllers");
const TimeSlotControllers = require("../controllers/TimeSlotControllers");
const TransactionController = require("../controllers/TransactionControllers");
const UserControllers = require("../controllers/UserControllers");
const CartControllers = require("../controllers/CartControllers");
const authentication = require("../middleware/authentication");
const route = require("express").Router();

route.get("/", (req, res) => {
  res.send("TEST ROUTING");
});

// User routes
route.post("/api/auth/register", UserControllers.userRegister);
route.post("/api/auth/login", UserControllers.userLogin);

// Product routes
route.post("/api/menu", ProductControllers.addMenuItem);
route.patch("/api/menu/:id", ProductControllers.updateMenuItem);
route.delete("/api/menu/:id", ProductControllers.deleteMenuItem);
route.get("/api/menu", ProductControllers.getAllMenuItems);
route.get("/api/menu/:id", ProductControllers.getMenuItemById);
route.post("/api/menu/:id/rating", ProductControllers.addRatingById);
route.post("/api/rate/:id", ProductControllers.addRatingById);
route.get("/api/slots", TimeSlotControllers.getAllSlotItems);



// Time Slot routes
route.get("/api/slots", TimeSlotControllers.getAllSlotItems);

// Cart routes
route.get("/api/cart", authentication, CartControllers.getCart);
route.post("/api/cart", authentication, CartControllers.addToCart);
route.delete("/api/cart/:order_item_id", authentication, CartControllers.removeFromCart);
route.patch("/api/cart/:order_item_id", authentication, CartControllers.updateOrderItemQuantity);


// Order routes
route.get(
  "/api/order/history",
  authentication,
  TransactionController.getTransactionHistory
);
route.get(
  "/api/order/:id",
  authentication,
  TransactionController.getTransactionHistoryById
);
route.post("/api/order", authentication, TransactionController.CartToOrder);
route.patch(
  "/api/order/:id/payment/mock",
  authentication,
  TransactionController.confirmOrder
);
route.patch(
  "/api/order/:id/preparing",
  authentication,
  TransactionController.confirmToPrepare
);

route.patch(
  "/api/order/:id/ready",
  authentication,
  TransactionController.readyToPickUp
);

route.patch(
  "/api/order/:id/pickedup",
  authentication,
  TransactionController.pickedUp
);

route.patch(
  "/api/order/:id/expired",
  authentication,
  TransactionController.expire
);

module.exports = route;
