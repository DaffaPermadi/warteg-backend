const {
  sequelize,
  Time_Slot,
  Order,
  Order_Item,
  Menu_Item,
  User
} = require("../models");

class TransactionController {
  static async getTransactionHistory(req, res, next) {
    try {
      const orders = await Order.findAll({
        where: {
          user_id: req.user.id  // ✅ Optional: if you only want current user's history
        },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'phone_number'] // Include only needed fields
          },
          {
            model: Time_Slot,
            as: 'slot',
            attributes: ['id', 'start_time', 'end_time']
          },
          {
            model: Order_Item,
            as: 'items',
            include: [
              {
                model: Menu_Item,
                as: 'menuItem',
                attributes: ['id', 'name', 'price', 'image']
              }
            ]
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionHistoryById(req, res, next) {
    try {
      const { id } = req.params;
  
      const order = await Order.findOne({
        where: {
          id,
          user_id: req.user.id // ✅ Optional: ensure the order belongs to the user
        },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'phone_number']
          },
          {
            model: Time_Slot,
            as: 'slot',
            attributes: ['id', 'start_time', 'end_time']
          },
          {
            model: Order_Item,
            as: 'items',
            include: [
              {
                model: Menu_Item,
                as: 'menuItem',
                attributes: ['id', 'name', 'price', 'image', 'total_rating', 'rating_count']
              }
            ]
          }
        ]
      });
  
      if (!order) {
        return res.status(404).json({ message: "Order not found or not yours" });
      }
  
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }  

  static async CartToOrder(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const user_id = req.user.id;
      const { slot_id, type } = req.body;

      // Cari slot
      const slot = await Time_Slot.findByPk(slot_id);
      if (!slot) throw { status: 404, message: "Time slot not found" };

      // Cek kapasitas slot
      const currentOrders = await Order.count({ where: { slot_id } });
      if (currentOrders >= slot.max_capacity) {
        throw {
          status: 400,
          message: "This time slot is already fully booked",
        };
      }

      // Cari cart user
      const cart = await Order.findOne({
        where: { user_id, status: "cart" },
        include: [
          {
            model: Order_Item,
            as: "items", // <- ini yang wajib ditambahkan
          },
        ],
      });
      if (!cart) throw { status: 404, message: "Cart not found" };

      // Hitung total harga dari isi cart
      let total_price = 0;
      for (const item of cart.items) {
        const menuItem = await Menu_Item.findByPk(item.menu_item_id);
        if (!menuItem) {
          throw {
            status: 404,
            message: `Menu item ID ${item.menu_item_id} not found`,
          };
        }
        total_price += item.quantity * menuItem.price;
      }

      // Update cart menjadi order yang valid
      cart.status = "waiting_payment";
      cart.slot_id = slot_id;
      console.log("type", type);
      cart.type = type;
      console.log(cart.type, "ini type woi");
      cart.total_price = total_price;

      await cart.save({ transaction: t });
      console.log("Cart updated:", cart.toJSON());

      await t.commit();
      res.status(200).json({
        message: "Order finalized successfully",
        orderId: cart.id,
      });
    } catch (error) {
      await t.rollback();
      console.error(error);
      next(error);
    }
  }

  // static async generatePayment(req, res, next) {
  //     try {
  //       const { id } = req.params;
  //       console.log('Order ID:', id); // This will log the correct order ID

  //         // Find order first
  //         const order = await Order.findByPk(id);
  //         if (!order) {
  //             return res.status(404).json({ message: 'Order not found' });
  //         }

  //         // Update status
  //         order.status = 'waiting to payment';
  //         await order.save();

  //         res.status(200).json({ message: 'Order status updated', order });

  //       res.status(200).json({ message: `Payment processed for order ${id}` });
  //     } catch (error) {
  //       next(error);
  //     }
  // }

  static async confirmOrder(req, res, next) {
    try {
      const user_id = req.user.id; // ambil user ID dari token/auth middleware
      const { id } = req.params;

      // Cari order berdasarkan id dan user_id
      const order = await Order.findOne({
        where: {
          id,
          user_id,
        },
      });

      if (!order) {
        return res
          .status(404)
          .json({ message: "Order not found or not yours" });
      }

      // Update status
      order.status = "confirmed";
      await order.save();

      return res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
      next(error);
    }
  }

  static async cancelTransaction(req, res, next) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Update status
      order.status = "canceled";
      await order.save();

      res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
      next(error);
    }
  }

  // ---------------Tanpa Admin Website -- Start --------------------

  static async confirmToPrepare(req, res, next) {
    try {
      const { id } = req.params;

      // Cari order berdasarkan id dan user_id
      const order = await Order.findOne({
        where: {
          id,
        },
      });

      if (!order) {
        return res
          .status(404)
          .json({ message: "Order not found or not yours" });
      }

      // Update status
      order.status = "preparing";
      await order.save();

      return res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
      next(error);
    }
  }

  static async readyToPickUp(req, res, next) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Update status
      order.status = "ready";
      await order.save();

      res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
      next(error);
    }
  }

  static async pickedUp(req, res, next) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Update status
      order.status = "picked_up";
      await order.save();

      res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
      next(error);
    }
  }

  static async expire(req, res, next) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Update status
      order.status = "expired";
      await order.save();

      res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
      next(error);
    }
  }

  // ---------------Tanpa Admin Website -- End --------------------

  // ---------------Dengan Website -- Start -----------------------

  // ---------------Dengan Website -- End -----------------------
}

module.exports = TransactionController;
