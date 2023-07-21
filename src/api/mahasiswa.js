const express = require("express");
const Mahasiswa = require('../models/mahasiswa');

const router = express.Router();

// Membuat produk baru dengan upload gambar
router.post('/mahasiswa',async (req, res) => {
  try {
    const { nama,nim, jurusan } = req.body;
    const mahasiswa = await Mahasiswa.create({ nama, nim, jurusan });
    res.status(201).json(mahasiswa);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create mahasiswa' });
  }
});

// Mendapatkan daftar semua produk
router.get('/mahasiswa', async (req, res) => {
    try {
      const mahasiswa = await Mahasiswa.findAll();
      res.json(mahasiswa);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
});

//menampilkan product dari category
// router.get('/products/category/:category', async (req, res) => {
//   try {
//     const { category } = req.params;
//     const products = await Product.findAll({ where: { category } });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch products by category' });
//   }
// });

// Memperbarui produk berdasarkan ID
router.put('/mahasiswa/:product_id', async (req, res) => { 
    try {
      const { product_id } = req.params;
      const { name, category, size, price, stock, description } = req.body;
      const updatedProduct = await Product.update({ name, category, size, price, stock, description }, {
        where: { product_id },
      });
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update product' });
    }
});

//menghapus product berdasarkan ID
router.delete('/mahasiswa/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;

    // Ambil informasi produk sebelum dihapus
    const product = await Product.findOne({ where: { product_id } });

    // Hapus foto produk dari folder jika ada
    // if (product && product.link_gambar) {
    //   // const imagePath = path.join(__dirname, 'assets', 'img', 'product', product.link_gambar);
    //   fs.unlinkSync(imagePath);
    // }

    // Hapus produk dari database
    await Product.destroy({ where: { product_id } });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;