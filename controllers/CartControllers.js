const { Order } = require("../models");
const { Order_Item } = require("../models");
const { Menu_Item } = require("../models");

class CartController {
  static async getCart(req, res) {
    try {
      console.log("Fetching cart for user:", req.user);
      const userId = req.user.id; // Assuming you have user ID in the request
        const cart = await Order.findOne({
      where: { user_id: userId, status: "cart" },
          include: [
            {
              model: Order_Item,
              as: "items",
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

  static async addToCart(req, res) {
    try {
      const userId = req.user.id; // Assuming you have user ID in the request
      const { menu_item_id, quantity } = req.body;

      if (!menu_item_id || !quantity) {
        return res.status(400).json({ message: "Menu item ID and quantity are required" });
      }

      const cart = await Order.findOne({
        where: { user_id: userId, status: "cart" },
      });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const orderItem = await Order_Item.create({
        order_id: cart.id,
        menu_item_id,
        quantity,
      });

      return res.status(201).json(orderItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

    static async removeFromCart(req, res) {
        try {
        const userId = req.user.id; // Assuming you have user ID in the request
        const { order_item_id } = req.params;

        if (!order_item_id) {
            return res.status(400).json({ message: "Order item ID is required" });
        }

        const cart = await Order.findOne({
            where: { user_id: userId, status: "cart" },
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const orderItem = await Order_Item.destroy({
            where: { id: order_item_id, order_id: cart.id },
        });

        if (!orderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }

        return res.status(200).json({ message: "Order item removed from cart" });
        } catch (error) {
        console.error("Error removing from cart:", error);
        return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = CartController;
