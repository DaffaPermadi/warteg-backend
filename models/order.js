'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Order.belongsTo(models.Time_Slot, { foreignKey: 'slot_id', as: 'slot' });
      Order.hasMany(models.Order_Item, { foreignKey: 'order_id', as: 'items' });
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    slot_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};