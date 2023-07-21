const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Mahasiswa = sequelize.define('Mahasiswa', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nim: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Menambahkan validasi agar email bersifat unik
  },
  jurusan:{
    type: DataTypes.STRING,
    allowNull:false
  }

});

module.exports = Mahasiswa;