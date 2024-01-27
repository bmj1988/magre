'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Branch.hasMany(models.User, {foreignKey: 'branchId'})
    }
  }
  Branch.init({
    animal: DataTypes.STRING,
    strengths: DataTypes.TEXT,
    weaknesses: DataTypes.TEXT,
    symbolism: DataTypes.TEXT,
    relationship: DataTypes.STRING,
    art: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Branch',
  });
  return Branch;
};
