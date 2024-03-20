'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {
        foreignKey: 'last_bidder'
      })
    }
  }
  Product.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty :{
          msg : "Name is required"
        },
        notNull :{
          msg : "Name is required"
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty :{
          msg : "Name is required"
        },
        notNull :{
          msg : "Name is required"
        }
      }
    },
    last_bidder: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty :{
          msg : "Bidder is required"
        },
        notNull :{
          msg : "Bidder is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};