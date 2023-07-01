module.exports = app => {

    var router = require('express').Router();

    const db = require('../models');
    const Cart = db.cart;

    router.get('/', async (req, res) => {
        try {
            const cart = await Cart.findAll({
            });

            if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
            }

            res.json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    router.post('/', async (req, res) => {
        let { productId, quantity, name, price } = req.body;

        // quantity = 1
            const existingCartItem = await Cart.findOne({
                where: { productId }
            });

            // const product = await Product.findByPk(productId);
            const data = {
                productId: productId,
                quantity: quantity,
                name: name,
                price: price,
            };

            if (existingCartItem) {
                // Jika produk sudah ada, update jumlahnya
                existingCartItem.quantity += quantity;
                await existingCartItem.save();
            } else {
                // Jika produk belum ada, tambahkan sebagai item baru di keranjang
                // const product = await Product.findByPk(productId);
                Cart.create(data)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log("err: ", err);
                    res.status(500).json({ message: 'internal server error', error: err.message });
                })
            }
        
            // ...
        
            res.status(201).json({ message: 'Product added to cart'});
    });

    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        try {
          const cartItem = await Cart.findByPk(id);
          if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
          }
    
          // Kurangi quantity jika item ditemukan
          cartItem.quantity -= 1;
    
          if (cartItem.quantity <= 0) {
            // Hapus item jika quantity mencapai 0
            await cartItem.destroy();
          } else {
            // Simpan perubahan jika quantity masih tersisa
            await cartItem.save();
          }
    
          res.json({ message: 'Quantity updated' });
        } catch (error) {
          res.status(500).json({ message: 'Internal server error', error: error.message });
        }
      });

      router.delete('/', async (req, res) => {
        try {
          // Hapus semua item dalam tabel cartItems
          await Cart.destroy({ where: {} });
      
          res.json({ message: 'All cart items deleted' });
        } catch (error) {
          res.status(500).json({ message: 'Internal server error', error: error.message });
        }
      });

    app.use('/api/cart', router);

};

