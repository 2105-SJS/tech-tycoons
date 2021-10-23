const express = require("express");
const productsRouter = express.Router()
// const jwt = require('jsonwebtoken');

const { 
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
} = require("../db");

//Products//

productsRouter.get("/", async (req, res, next) => {
    try {
      const products = await getAllProducts();
  
      res.send({
        products: products,
      });
    } catch ({ name, messages }) {
      next({ name: "GetProductsError", message: "Unable to get products" });
    }
  });