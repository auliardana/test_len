//library passport
const { authenticateJwt, protectAdminRoute } = require('../auth/passport');
//library multer untuk upload gambar
const multer = require('multer');
// dependency path
const path = require('path');
//dependency file system
const fs = require('fs');

const express = require("express");
const Product = require('../models/product');

const router = express.Router();

// Endpoint untuk mengirimkan gambar
router.get('/images/:filename', (req, res) => {
  const fileName = req.params.filename;
  const productImagesDir = path.join(__dirname, '../assets/img/product');
  const imagePath = path.join(productImagesDir, fileName);

  // Mengirimkan file gambar sebagai respons
  res.sendFile(imagePath);
});


// Konfigurasi penyimpanan file menggunakan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../assets/img/product")); // Menyimpan file di direktori 'assets/img'
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = file.fieldname + '-' + Date.now() + ext;
    cb(null, fileName); // Menyimpan file dengan nama unik
  },
});

// Mengatur filter untuk hanya menerima file gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed.'), false);
  }
};

// Membuat middleware upload menggunakan multer
const upload = multer({ storage, fileFilter });

// Rute-rute API terkait produk akan ditambahkan di sini

// Membuat produk baru dengan upload gambar
router.post('/products',authenticateJwt , protectAdminRoute, upload.single('image'), async (req, res) => {
  try {
    const { name, category, size, price, stock, description } = req.body;
    const link_gambar = req.file.filename; // Mengambil nama file gambar yang diupload
    const product = await Product.create({ name, category, size, price, stock, link_gambar, description });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
});

// Mendapatkan daftar semua produk
router.get('/products', async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }

    // try {
    //   const productImagesDir = path.join(__dirname, '../assets/img/product');
    //   const fileNames = fs.readdirSync(productImagesDir);
    //   const images = fileNames.map(fileName => `/assets/img/product/${fileName}`);
    //   res.json(images);
    // } catch (error) {
    //   res.status(500).json({ error: 'Failed to fetch product images' });
    // }

    // try {
    //   const productImagesDir = path.join(__dirname, '../assets/img/product');
    //   const fileName = 'image-1688755242058.jpg';
    //   const imagePath = path.join(productImagesDir, fileName);
    //   res.sendFile(imagePath);
    // } catch (error) {
    //   res.status(500).json({ error: 'Failed to fetch product image' });
    // }
});

//menampilkan product dari category
router.get('/products/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.findAll({ where: { category } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products by category' });
  }
});

// Memperbarui produk berdasarkan ID
router.put('/products/:product_id', authenticateJwt, protectAdminRoute, async (req, res) => { 
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
router.delete('/products/:product_id', authenticateJwt, protectAdminRoute, async (req, res) => {
  try {
    const { product_id } = req.params;

    // Ambil informasi produk sebelum dihapus
    const product = await Product.findOne({ where: { product_id } });
    const productImagesDir = path.join(__dirname, '../assets/img/product');
    const fileName = product.link_gambar;
    const imagePath = path.join(productImagesDir, fileName);

    // Hapus foto produk dari folder jika ada
    if (product && product.link_gambar) {
      // const imagePath = path.join(__dirname, 'assets', 'img', 'product', product.link_gambar);
      fs.unlinkSync(imagePath);
    }

    // Hapus produk dari database
    await Product.destroy({ where: { product_id } });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;