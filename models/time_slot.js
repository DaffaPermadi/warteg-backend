'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Time_Slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Time_Slot.init({
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    max_capacity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Time_Slot',
  });
  return Time_Slot;
};