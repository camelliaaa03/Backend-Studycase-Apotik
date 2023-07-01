module.exports = (sequelize, Sequelize) => {

    const Cart = sequelize.define('Cart', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return Cart;
}