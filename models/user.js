'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/byrcrpt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        foreignKey: 'last_bidder'
      })
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required"
          },
          notNull: {
            msg: "Name is required"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email must be unique"
        },
        validate: {
          notEmpty: {
            msg: "Email is required"
          },
          notNull: {
            msg: "Email is required"
          },
          isEmail: {
            msg: "Must be Email Format"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required"
          },
          notNull: {
            msg: "Password is required"
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });

  return User;
};