const { Menu_Item } = require("../models");

class ProductControllers {
  static async addMenuItem(req, res, next) {
    try {
      const { name, price, description, category, available_stock } = req.body;

      if (!name || !price || !description || !category || !available_stock) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const rating_count = 30;
      const total_rating = 150;
      const rating = total_rating / rating_count;

      const newMenuItem = await Menu_Item.create({
        name,
        price,
        description,
        category,
        available_stock,
        rating,
        rating_count,
        total_rating
      });

      res.status(201).json(newMenuItem);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }

  static async updateMenuItem(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price, description, category, available_stock } = req.body;

      const menuItem = await Menu_Item.findByPk(id);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      await menuItem.update({
        name,
        price,
        description,
        category,
        available_stock,
      });

      res.status(200).json(menuItem);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }

  static async deleteMenuItem(req, res, next) {
    try {
      const { id } = req.params;
      const menuItem = await Menu_Item.findByPk(id);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      await menuItem.destroy();
      res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }

  static async getAllMenuItems(req, res, next) {
    try {
      const menuItems = await Menu_Item.findAll();
      res.status(200).json(menuItems);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }

  static async getMenuItemById(req, res, next) {
    try {
      const { id } = req.params;
      const menuItem = await Menu_Item.findByPk(id);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.status(200).json(menuItem);
    } catch (error) {
      next(error);
    }
  }

  static async addRatingById(req, res, next) {
    try {
      const { id } = req.params;
      const { rating } = req.body;

      if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
        return res
          .status(400)
          .json({ message: "Rating must be between 1 and 5" });
      }

      const menuItem = await Menu_Item.findByPk(id);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      menuItem.total_rating += rating;
      menuItem.rating_count += 1;
      // Tidak perlu update rating manual karena sudah ada hook di model
      await menuItem.save();

      res.status(200).json({
        message: "Rating updated successfully",
        rating: menuItem.rating,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductControllers;
