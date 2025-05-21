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
    available_stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Menu_Item',
  });
  return Menu_Item;
};