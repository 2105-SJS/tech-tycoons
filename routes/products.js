const express = require("express");
const productsRouter = express.Router()

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
    productsRouter.post("/", async (req, res, next) => {
      const { imgURL, title, description, price, author, genre, inStock } = req.body;
      const productData = {};
      try {
        productData.imgURL = imgURL;
        productData.title = title;
        productData.description = description;
        productData.price = price;
        productData.author = author;
        productData.genre = genre;
        productData.inStock = inStock;
        if (!title) {
          res.send(next(console.error({ message: "Must include title" })));
        }
        if (!author) {
          res.send(next(console.error({ message: "Must include author" })));
        }
        if (!description) {
          res.send(next(console.error({ message: "Must include description" })));
        }
        if (!price) {
          res.send(next(console.error({ message: "Must include price" })));
        }
        const newProduct = await createProduct(productData); // req.body
        res.send({
          message: "Product successfully created!",
          newProduct,
        });
      } catch ({ title, message }) {
        next({
          title: "ProductCreateError",
          message: "Unable to create new Product.",
        });
      }
    });
    productsRouter.patch("/:product_id", async (req, res, next) => {
      const { product_id } = req.params;
      const { imgURL, title, description, price, author, genre, inStock } = req.body;
      const updateFields = {};
      if (imgURL) {
        updateFields.imgURL = imgURL;
      }
      if (title) {
        updateFields.title = title;
      }
      if (description) {
        updateFields.description = description;
      }
      if (price) {
        updateFields.price = price;
      }
      if (author) {
          updateFields.author = author;
        }
      if (inStock) {
        updateFields.inStock = inStock;
      }
      if (genre) {
        updateFields.genre = genre;
      }
      try {
        const updatedProduct = await updateProduct(product_id, updateFields);
        res.send({ updatedProduct });
      } catch ({ title, message }) {
        next({ title: "ProductUpdateError", message: "Unable to update product info!" });
        console.error(message)
      }
    });
    productsRouter.delete("/:product_id", async (req, res, next) => {
      try {
        const product = await getProductById(req.params.product_id);
        if (product.active) {
          const updatedProduct = await updateProduct(product.id, { active: false });
          res.send({ product: updatedProduct });
        } else {
          res.send({
            name: "ProductInactiveError",
            message: "This product is already deleted!",
          });
        }
      } catch ({ title, message }) {
        next({ title: "ProductUpdateError", message: "Unable to update product!" });
      }
    });
    module.exports = productsRouter;
