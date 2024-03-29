'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trigram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trigram.init({
    name: DataTypes.STRING,
    element: DataTypes.STRING,
    phase: DataTypes.STRING,
    composition: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trigram',
  });
  return Trigram;
};