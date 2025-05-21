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
}

module.exports = TransactionController;