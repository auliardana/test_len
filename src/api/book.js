const express = require("express");
const Book = require('../models/book');

const router = express.Router();

// Membuat produk baru dengan upload gambar
router.post('/books',async (req, res) => {
  try {
    const { judul, penulis, kuantitas, tempat_penyimpanan } = req.body;
    const book = await Book.create({ judul, penulis, kuantitas, tempat_penyimpanan });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
});

// Mendapatkan daftar semua produk
router.get('/books', async (req, res) => {
    try {
      const book = await Book.findAll();
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.put('/books/:id', async (req, res) => { 
    try {
      const { id } = req.params;
      const { nama, nim, jurusan } = req.body;
      const updatedBook = await Book.update({ nama, nim, jurusan }, {
        where: { id },
      });
      res.json(updatedBook);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update product' });
    }
});

//menghapus product berdasarkan ID
router.delete('/books/:id', async (req, res) => {
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