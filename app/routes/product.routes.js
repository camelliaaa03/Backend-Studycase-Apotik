module.exports = app => {

    const products = require('../controllers/product.controller.js');

    var router = require('express').Router();

    const authJwt = require('../middleware/authJwt');

    router.post('/', [authJwt.verifyToken, authJwt.isAdmin], products.create);

    router.get('/',  products.findAll);

    router.get('/:id',  products.findOne);

    router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], products.update);

    router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], products.delete);

    app.use('/api/products', router);

};