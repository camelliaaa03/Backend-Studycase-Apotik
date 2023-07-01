module.exports = app => {

    const express = require('express');
    const router = express.Router();
    const db = require('../models');
    const order = db.order;
    
    // POST untuk membuat data baru
    router.post('/', async (req, res) => {
      try {
        const { productCount, total, customerName } = req.body;
    
        // Membuat data baru menggunakan model CartItemFinal
        const newOrder = await order.create({
          productCount,
          total,
          customerName
        });
    
        res.status(201).json(newOrder);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
    

    // GET untuk mengambil data
    router.get('/', async (req, res) => {
        try {
        // Mengambil semua data dari model Order
        const orders = await order.findAll();
    
        res.status(200).json(orders);
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        }
    });

    router.delete('/:id', async (req, res) => {
      const orderId = req.params.id;
    
      try {
        // Cari dan hapus data order berdasarkan id
        const deletedOrder = await order.destroy({ where: { id: orderId } });
    
        if (deletedOrder) {
          res.json({ message: 'Order item deleted' });
        } else {
          res.status(404).json({ message: 'Order item not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
      }
    });

    router.delete('/', async (req, res) => {
      try {
        // Hapus semua item dalam tabel cartItems
        await order.destroy({ where: {} });
    
        res.json({ message: 'All Order items deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
      }
    });

    app.use('/api/order', router);
    
};
    