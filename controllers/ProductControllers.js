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

    static async getMenuItemById(req, res, next) {
        try {
            const { id } = req.params;
            const menuItem = await Menu_Item.findByPk(id);
            if (!menuItem) {
                return res.status(404).json({ message: 'Menu item not found' });
            }
            res.status(200).json(menuItem);
        } catch (error) {
            next(error)
        }
    }

    static async addRatingById(req, res, next) {
        try {
            const { id } = req.params;
            const { rating } = req.body;

            if (!rating) {
                return res.status(400).json({ message: 'Rating is required' });
            }

            const menuItem = await Menu_Item.findByPk(id);
            if (!menuItem) {
                return res.status(404).json({ message: 'Menu item not found' });
            }

            menuItem.rating = rating;
            await menuItem.save();

            res.status(200).json(menuItem);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductControllers;