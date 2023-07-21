const { DataTypes } = require('sequelize');
const sequelize = require('../database');
// const Order = require('./order');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Menambahkan validasi agar email bersifat unik
    validate: {
      isEmail: true, // Validasi format email
    },
  },
  role:{
    type : DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 20], // Validasi panjang password minimal 6 karakter, maksimal 20 karakter
    },
  },
});

// Menambahkan relasi one-to-many dengan model "Order"
// User.hasMany(Order, {
//   foreignKey: 'user_id',
//   as: 'orders',
// });

module.exports = User;
