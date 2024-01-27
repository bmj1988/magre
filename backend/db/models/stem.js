'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stem.hasMany(models.User, {foreignKey: 'stemId'})
    }
  }
  Stem.init({
    name: DataTypes.STRING,
    element: DataTypes.STRING,
    indication: DataTypes.TEXT,
    alignment: DataTypes.STRING,
    symbolism: DataTypes.TEXT,
    art: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stem',
  });
  return Stem;
};
