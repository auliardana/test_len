const express = require('express');

const Cart = require('../models/cart');
const User = require('../models/user');
const Product = require('../models/product');

const router = express.Router();

// Endpoint untuk menampilkan semua item dalam keranjang
router.get('/cart', async (req, res) => {
  try {
    const carts = await Cart.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Product, attributes: ['id', 'name', 'price'] }
      ]
    });
    res.json(carts);
  } catch (error) {
    console.error('Gagal mendapatkan daftar cart:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data cart' });
  }
});

// Endpoint untuk menambahkan item ke dalam keranjang
router.post('/cart', async (req, res) => {
    const { userId, productId, quantity, price, shipping_address } = req.body;
    const total_price = quantity * price;
    const checkout_date = null; // Set checkout_date null saat menambahkan item ke dalam keranjang
  
    try {

        const product = await Product.findByPk(productId); // Menemukan produk berdasarkan productId
        if (!product) {
            return res.status(404).json({ error: 'Produk tidak ditemukan' });
        }
    
        if (quantity > product.stock) {
            return res.status(400).json({ error: 'Jumlah stok produk tidak mencukupi' });
        }

        // Mengurangi stok pada tabel products
        product.stock -= quantity;
        await product.save();
    
        // Lanjutkan penambahan item ke dalam keranjang jika stok mencukupi
        const createdCart = await Cart.create({
            userId,
            productId,
            quantity,
            price,
            total_price,
            is_checked_out: false,
            checkout_date,
            shipping_address
        });
    
        res.json(createdCart);
    } catch (error) {
      console.error('Gagal membuat cart baru:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat membuat cart baru' });
    }
  });

// Endpoint untuk menghapus item dari keranjang berdasarkan ID
router.delete('/cart/:id', async (req, res) => {
  const cartId = req.params.id;

  try {
    await Cart.destroy({ where: { id: cartId } });
    res.sendStatus(204);
  } catch (error) {
    console.error('Gagal menghapus cart:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghapus cart' });
  }
});

// Endpoint untuk mengupdate jumlah produk dalam keranjang berdasarkan ID
router.put('/cart/:id', async (req, res) => {
  const cartId = req.params.id;
  const { quantity } = req.body;

  try {
    await Cart.update({ quantity }, { where: { id: cartId } });
    res.sendStatus(204);
  } catch (error) {
    console.error('Gagal mengupdate cart:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengupdate cart' });
  }
});

module.exports = router;