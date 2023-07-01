const db = require('../models');
const Product = db.products;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "name can not be empty!"
        });
        return;
    }

    const produk = {
        name: req.body.name,
        harga: req.body.harga,
        description: req.body.description,
        expired: req.body.expired,
        categoryId: req.body.categoryId
    };

    Product.create(produk)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'some error occured while creating the produk'
            });
        });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? {
        name: {
            [Op.iLike]: `%${name}%`
        }
    } : null;

    Product.findAll({
            where: condition,
            include: [{
                model: db.categories,
                as: 'category',
                attributes: ['id', 'name']
            }]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving products.'
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id, {
            include: [{
                model: db.categories,
                as: 'category',
                attributes: ['id', 'name']
            }]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Product with id=${id}`
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Product.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Product was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Product with id=${id}`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Product.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Product was deleted successfully!'
                });
            } else {
                res.send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete Product with id=${id}`
            });
        });
};