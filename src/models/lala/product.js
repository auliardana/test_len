// Import Sequelize
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
// const Order = require('./order');

// Define model Product
const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Atribut nama pakaian
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true // Contoh validasi: tidak boleh kosong
    }
  },
  // Atribut kategori
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true // Contoh validasi: tidak boleh kosong
    }
  },
  // Atribut ukuran pakaian
  size: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true // Contoh validasi: tidak boleh kosong
    }
  },
  // Atribut harga
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0 // Contoh validasi: harus bernilai lebih besar atau sama dengan 0
    }
  },
  // Atribut stok
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0 // Contoh validasi: harus bernilai lebih besar atau sama dengan 0
    }
  },
  link_gambar: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true // Contoh validasi: tidak boleh kosong
    }
  },
  // Atribut deskripsi pakaian
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  // Nama tabel di database
  // tableName: 'products',
  // Timestamps (createdAt, updatedAt)
  timestamps: true
});

// Relasi dengan model "Order"
// Product.belongsTo(Order, {
//   foreignKey: 'order_id',
//   as: 'orders'
// });

module.exports = Product;
