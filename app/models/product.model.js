module.exports = (sequelize, Sequelize) => {
    
    const Product = sequelize.define('products', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        },
        expired : {
            type: Sequelize.DATE,
            allowNull: false,
            // get() {
            //     const date = this.getDataValue('expired');
            //     return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'numeric', year: 'numeric' });
            // }
        },
    });

    return Product;
}