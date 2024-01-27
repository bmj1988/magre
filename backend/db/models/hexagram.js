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
      Hexagram.belongsTo(models.Trigram, { foreignKey: 'upper', as: 'upperTrigram'})
      Hexagram.belongsTo(models.Trigram, { foreignKey: 'lower', as: 'lowerTrigram'})
    }
  }
  Hexagram.init({
    name: DataTypes.STRING,
    composition: DataTypes.STRING,
    aspect: DataTypes.STRING,
    guidance: DataTypes.TEXT,
    wisdom: DataTypes.TEXT,
    art: DataTypes.STRING,
    upper: DataTypes.INTEGER,
    lower: DataTypes.INTEGER,
    first: DataTypes.TEXT,
    second: DataTypes.TEXT,
    third: DataTypes.TEXT,
    fourth: DataTypes.TEXT,
    fifth: DataTypes.TEXT,
    sixth: DataTypes.TEXT,
    all: DataTypes.TEXT,


  },
    {
      sequelize,
      modelName: 'Hexagram',
      indexes: [
        {
          unique: true,
          fields: ['composition']
        },
        {
          unique: true,
          fields: ['lower', 'upper']
        }
      ],
      defaultScope: {
        attributes: ['name', 'composition', 'aspect', 'guidance', 'wisdom', 'art']
      },
    });
  return Hexagram;
};
