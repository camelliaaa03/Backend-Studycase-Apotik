const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.categories = require("./category.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);

db.cart = require("../models/cart.model")(sequelize, Sequelize);
db.order = require("../models/order.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.categories.hasMany(db.products);

db.products.belongsTo(db.categories, {
    foreignKey: "categoryId",
    as: "category",
});

db.cart.belongsTo(db.products, {
  foreignKey: "productId",
});

db.order.hasMany(db.products, {
  foreignKey: "productId",
});

db.products.hasMany(db.order, {
  foreignKey: "orderId",
});

db.order.belongsTo(db.cart, {
  foreignKey: "cartId",
});

db.ROLES = ["admin", "kasir"];

module.exports = db;