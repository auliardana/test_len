const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Book = sequelize.define('Book', {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  penulis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kuantitas:{
    type : DataTypes.STRING,
    allowNull: false,
  },
  tempat_penyimpanan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Book;