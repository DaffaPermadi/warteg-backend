const { sequelize, Time_Slot, Order, Order_Item, Menu_Item } = require("../models");

class TransactionController {
    static async getOrders(req, res, next) {
        try {
            const orders = await Order.findAll();
            res.status(200).json(orders);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TransactionController;