const { Menu_Item }  = require('../models');

class ProductControllers {
    static async getAllMenuItems(req, res, next) {
        try {
            const menuItems = await Menu_Item.findAll();
            res.status(200).json(menuItems);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductControllers;