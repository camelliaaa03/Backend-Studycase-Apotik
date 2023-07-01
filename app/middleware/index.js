const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const auth = require("../controllers/auth.controller");
const category = require("../controllers/category.controller");
const product = require("../controllers/product.controller");

module.exports = {
  authJwt,
  verifySignUp,
  auth,
  category,
  product
};