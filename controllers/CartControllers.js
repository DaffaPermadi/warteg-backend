const { Order } = require("../models");

class CartController {
  static async getCart(req, res) {
    try {
      console.log("Fetching cart for user:", req.user);
      const userId = req.id; // Assuming you have user ID in the request
        const cart = await Order.findOne({
      where: { user_id: userId, status: "cart" },
          include: [
            {
              model: Order_Item,
              as: "orderItems",
              include: [
                {
                  model: Menu_Item,
                  as: "menuItem",
                },
              ],
            },
          ],
        });

        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }

        return res.status(200).json(cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = CartController;
