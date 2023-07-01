module.exports = (sequelize, Sequelize) => {

    const Order = sequelize.define('Order', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        productCount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        total: { 
            type: Sequelize.INTEGER,
            allowNull:false,
        },
        customerName: {
            type: Sequelize.STRING,
            allowNull:false,
        },                                                                                                                              
    });
    return Order;
}