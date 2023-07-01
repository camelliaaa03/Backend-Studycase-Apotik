module.exports = app => {
    const categories = require('../controllers/category.controller.js');

    var router = require('express').Router();

    const authJwt = require('../middleware/authJwt');

    router.post('/', [authJwt.verifyToken, authJwt.isAdmin], categories.create);

    router.get('/',  categories.findAll);

    router.get('/:id',  categories.findOne);

    router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], categories.update);

    router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], categories.delete);

    app.use('/api/categories', router);
};
