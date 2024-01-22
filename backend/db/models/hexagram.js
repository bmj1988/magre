'use strict';
const {
  Model, IndexHints
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hexagram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hexagram.init({
    name: DataTypes.STRING,
    composition: DataTypes.STRING,
    aspect: DataTypes.STRING,
    guidance: DataTypes.TEXT,
    wisdom: DataTypes.TEXT,
    art: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'Hexagram',
    indexes: [
      {
        unique: true,
        fields:['composition']
      }
    ],
    defaultScope: {
      attributes: ['name', 'composition', 'aspect', 'guidance', 'wisdom', 'art']
    }
  });
  return Hexagram;
};
