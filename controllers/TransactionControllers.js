const { sequelize, Time_Slot, Order, Order_Item, Menu_Item } = require("../models");

class TransactionController {
    static async getTransactionHistory(req, res, next) {
        try {
            const orders = await Order.findAll();
            res.status(200).json(orders);
        } catch (error) {
            next(error)
        }
    }

    static async getTransactionHistoryById(req, res, next) {
        try {
            const { id } = req.params;

            const orders = await Order.findByPk(id);
            res.status(200).json(orders);
        } catch (error) {
            next(error)
        }
    }

    static async processPayment(req, res, next) {
        try {
          const { id } = req.params;
          console.log('Order ID:', id); // This will log the correct order ID

            // Find order first
            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Update status
            order.status = 'confirmed';
            await order.save();

            res.status(200).json({ message: 'Order status updated', order });
      
          res.status(200).json({ message: `Payment processed for order ${id}` });
        } catch (error) {
          next(error);
        }
    }
      
}

module.exports = TransactionController;