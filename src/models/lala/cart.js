const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = require('./user');
const Product = require('./product');

const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'product_id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    is_checked_out: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    checkout_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    shipping_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'carts',
    timestamps: true,
  });
  
  Cart.belongsTo(User, { foreignKey: 'userId' });
  Cart.belongsTo(Product, { foreignKey: 'productId' });
  
  module.exports = Cart;