'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Menu_Item.hasMany(models.Order_Item, {
        foreignKey: 'menu_item_id',
        as: 'orderItems'
      });
      
    }
  }
  Menu_Item.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    available_stock: DataTypes.INTEGER,
    category: DataTypes.ENUM('food', 'drinks', 'additional'),
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    total_rating: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    },
    rating_count: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 5.0
    }
  }, {
    sequelize,
    modelName: 'Menu_Item',
    hooks: {
      beforeSave: (menuItem, options) => {
        if (menuItem.total_rating && menuItem.rating_count) {
          menuItem.rating = parseFloat((menuItem.total_rating / menuItem.rating_count).toFixed(2));
        }
      }
    }
  });
  
  return Menu_Item;
};