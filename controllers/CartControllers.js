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
        return res
          .status(400)
          .json({ message: "Menu item ID and quantity are required" });
      }

      const [cart, created] = await Order.findOrCreate({
        where: { user_id: userId, status: "cart" },
        defaults: {
          user_id: userId,
          status: "cart",
          total_price: 0, // Inisialisasi total_price untuk keranjang baru
          // slot_id dan type bisa null untuk keranjang, jadi tidak perlu diset secara eksplisit
        },
      });

      const menuItem = await Menu_Item.findByPk(menu_item_id);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      // Check if the menu item is available
      if(quantity <= 0){
        return res.status(400).json({ message: "Quantity must be greater than 0" });
      }

      if (menuItem.available_stock < quantity) {
        return res.status(400).json({ message: "Not enough stock available" });
      }
      // Check if the item already exists in the cart
      const existingOrderItem = await Order_Item.findOne({
        where: { order_id: cart.id, menu_item_id },
      });
      if (existingOrderItem) {
        // If it exists, update the quantity
        existingOrderItem.quantity += quantity;
        await existingOrderItem.save();

        // Update total_price as well
        cart.total_price += quantity * menuItem.price;
        await cart.save();

        menuItem.available_stock -= quantity;
        await menuItem.save();

        return res.status(200).json(existingOrderItem);
      }

      menuItem.available_stock -= quantity; // Reduce the available stock
      await menuItem.save(); // Save the updated menu item

      // If it doesn't exist, create a new order item
      const orderItem = await Order_Item.create({
        order_id: cart.id,
        menu_item_id,
        quantity,
        price_per_item: menuItem.price,
      });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      cart.total_price += quantity * menuItem.price; // Update total price
      await cart.save(); // Save the updated cart

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

      // reduce the total price of the cart
      const orderItem = await Order_Item.findOne({
        where: { id: order_item_id, order_id: cart.id },
      });
      if (!orderItem) {
        return res.status(404).json({ message: "Order item not found" });
      }

      const menuItem = await Menu_Item.findByPk(orderItem.menu_item_id);
      menuItem.available_stock += orderItem.quantity; // Increase the available stock
      await menuItem.save(); // Save the updated menu item

      cart.total_price -= orderItem.quantity * orderItem.price_per_item;
      await cart.save();

      // remove the order item from the cart
      await Order_Item.destroy({
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

  static async updateOrderItemQuantity(req, res) {
    try {
      const userId = req.user.id; // Assuming you have user ID in the request
      const { order_item_id } = req.params;
      const { quantity } = req.body;

      if(quantity <= 0){
        return res.status(400).json({ message: "Quantity must be greater than 0" });
      }

      if (!order_item_id || !quantity) {
        return res
          .status(400)
          .json({ message: "Order item ID and quantity are required" });
      }

      const cart = await Order.findOne({
        where: { user_id: userId, status: "cart" },
      });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const orderItem = await Order_Item.findOne({
        where: { id: order_item_id, order_id: cart.id },
      });

      if (!orderItem) {
        return res.status(404).json({ message: "Order item not found" });
      }

      // Update the quantity and total price
      const menuItem = await Menu_Item.findByPk(orderItem.menu_item_id);
      if (menuItem.available_stock < quantity) {
        return res.status(400).json({ message: "Not enough stock available" });
      }
      
      const gapQuantity = quantity - orderItem.quantity;
      console.log("Gap Quantity:", gapQuantity);
      // Update stock
      if (gapQuantity !== 0) {
        menuItem.available_stock -= gapQuantity;
        await menuItem.save();
      }

      cart.total_price += (quantity - orderItem.quantity) * menuItem.price;
      await cart.save();

      orderItem.quantity = quantity;
      await orderItem.save();

      return res.status(200).json(orderItem);
    } catch (error) {
      console.error("Error updating order item quantity:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = CartController;
