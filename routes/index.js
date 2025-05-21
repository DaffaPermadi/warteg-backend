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
route.post("/api/register", UserControllers.userRegister);
route.post("/api/login", UserControllers.userLogin);

// Product routes
route.get("/api/menu", ProductControllers.getAllMenuItems);
route.get("/api/slots", TimeSlotControllers.getAllSlotItems);
route.get("/api/menu/:id", ProductControllers.getMenuItemById);
route.post("/api/menu/:id/rating", ProductControllers.addRatingById);

// Time Slot routes
route.get("/api/slots", TimeSlotControllers.getAllSlotItems);

// Cart routes
route.get("/api/cart", authentication, CartControllers.getCart);
route.post("/api/cart", authentication, CartControllers.addToCart);
route.delete("/api/cart", authentication, CartControllers.removeFromCart);

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

module.exports = route;
