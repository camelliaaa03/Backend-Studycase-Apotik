const authJwt = require('../middleware/authJwt');
const db = require('../models');
const Category = db.categories;
const Op = db.Sequelize.Op;

exports.create =  (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: 'Name can not be empty',
        });
        return;
    }

    const category = {
        name: req.body.name,
    };
    // const userId = req.user.id;

    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the category.',
            });
        });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ?
        {
            name: {
                [Op.iLike]: `%${name}%`,
            },
        } :
        null;

    Category.findAll({
            where: condition,
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message ||
                    'some error occured while retrieving categories',
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error when retrieving Category with id=${id}`,
            });
        });
};

exports.update = (authJwt.isAdmin, async (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
        .then(category => {
            if (category) {
                const previousName = category.name; // Menyimpan nama kategori sebelumnya
                const newName = req.body.name || previousName; // Menggunakan nilai baru jika ada, jika tidak, gunakan nama sebelumnya

                category.name = newName; // Mengupdate nama kategori pada entitas category

                category.save() // Menyimpan perubahan pada entitas category
                    .then(() => {
                        res.send({
                            message: 'Category was updated successfully.',
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: `Error updating Category with id=${id}`,
                        });
                    });
            } else {
                res.send({
                    message: `Category with id=${id} was not found.`,
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Category with id=${id}`,
            });
        });
});


exports.delete = (authJwt.isAdmin, async (req, res) => {
    const id = req.params.id;

    Category.destroy({
            where: {
                id: id,
            },
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Category was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete Category with id=${id}`,
            });
        });
});
