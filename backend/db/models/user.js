'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {args: [4, 50], msg: 'Name must be between 4 and 50 characters'},
        // isAlpha: {args: true, msg: 'Name must contain only alphabetic characters'},
        hasFirstAndLast(value) {
          const nameArr = value.split(' ')
          if (nameArr.length < 2) {
            throw new Error('Must include both first and last name');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {args: [3,256], msg: 'Email must be between 3 and 256 characters long'},
        isEmail: {args: true, msg: 'You must provide a valid email address'}
      }
    },
    hashedPw: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: {args: [60,60], msg: 'Password hashing producing invalid character length'}
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPw", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
