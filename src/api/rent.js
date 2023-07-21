const express = require("express");
const Rent = require('../models/rent');
const Book = require('../models/book');

const router = express.Router();

// Membuat rent
router.post('/rents',async (req, res) => {
  try {
    const { peminjam, mahasiswaId, buku_yang_dipinjam,tanggal_peminjaman, tanggal_batas_pengembalian, tanggal_pengembalian } = req.body;
    
    const jumlah_minjam = await Rent.count({ where: {mahasiswaId: mahasiswaId}});
    if(jumlah_minjam>10){
        return res.status(400).json({ error: 'sudah lebih dari 10' })
    }
    
    const cariBuku = await Book.findAll({where: {judul: buku_yang_dipinjam}})
    if(!cariBuku){
        return res.status(400).json({ error: 'buku tidak ditemukan' })
    }

    const rent = await Rent.create({ peminjam, mahasiswaId, buku_yang_dipinjam, tanggal_peminjaman, tanggal_batas_pengembalian, tanggal_pengembalian});
    
    cariBuku.kuantitas -= 1;
    await Book.Save();

    res.status(201).json(rent);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create rent' });
  }
});

// Mendapatkan daftar semua produk
router.get('/rents', async (req, res) => {
    try {
      const book = await Rent.findAll();
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.put('/rents/:id', async (req, res) => { 
    try {
      const { id } = req.params;
      const {  peminjam, buku_yang_dipinjam,tanggal_peminjaman, tanggal_batas_pengembalian } = req.body;
      const updatedBook = await Rent.update({  peminjam, buku_yang_dipinjam, tanggal_peminjaman, tanggal_batas_pengembalian }, {
        where: { id },
      });
      res.json(updatedBook);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update product' });
    }
});

//menghapus product berdasarkan ID
router.delete('/rents/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Ambil informasi produk sebelum dihapus
    const book = await Book.findOne({ where: { id } });

    // Hapus produk dari database
    await Book.destroy({ where: { id } });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;