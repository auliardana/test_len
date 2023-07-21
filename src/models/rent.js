const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Mahasiswa = require('./mahasiswa');

const Rent = sequelize.define('Rent', {
  peminjam: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mahasiswaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Mahasiswa,
      key: 'id',
    },
  },
  buku_yang_dipinjam: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggal_peminjaman:{
    type : DataTypes.DATE,
    allowNull: false,
  },
  tanggal_batas_pengembalian: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tanggal_pengembalian: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Rent;