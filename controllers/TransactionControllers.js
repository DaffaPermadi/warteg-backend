const { sequelize, Time_Slot, Order, Order_Item, Menu_Item } = require("../models");

class TransactionController {
    static async createOrder(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const user_id = req.user.id; // Assuming you have user ID in the request
          const { slot_id, items } = req.body;
    
          // Check if slot exists
          const slot = await Time_Slot.findByPk(slot_id);
          if (!slot) throw { status: 404, message: 'Time slot not found' };
    
          // Check slot capacity
          const currentOrders = await Order.count({ where: { slot_id } });
          if (currentOrders >= slot.max_capacity) {
            throw { status: 400, message: 'This time slot is already fully booked' };
          }
    
          // Fetch prices from menu and calculate total
          let total_price = 0;
          const detailedItems = [];
    
          for (const item of items) {
            const menuItem = await Menu_Item.findByPk(item.menu_item_id);
            if (!menuItem) {
              throw { status: 404, message: `Menu item ID ${item.menu_item_id} not found` };
            }
    
            const subtotal = menuItem.price * item.quantity;
            total_price += subtotal;
    
            detailedItems.push({
              menu_item_id: item.menu_item_id,
              quantity: item.quantity,
              price_per_item: menuItem.price
            });
          }
    
          // Create the order
          const order = await Order.create({
            user_id,
            slot_id,
            status: 'waiting_payment',
            total_price
          }, { transaction: t });
    
          // Attach order_id to all order items
          const orderItemsToCreate = detailedItems.map(item => ({
            ...item,
            order_id: order.id
          }));
    
          await Order_Item.bulkCreate(orderItemsToCreate, { transaction: t });
    
          await t.commit();
          res.status(201).json({
            message: 'Order created successfully',
            orderId: order.id
          });
        } catch (error) {
          await t.rollback();
          console.error(error)
          next(error);
        }
      }
}

module.exports = TransactionController;