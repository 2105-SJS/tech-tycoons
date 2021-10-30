const express = require("express")
const apiRouter = express.Router()
const ordersRouter = require("./orders");
const productsRouter = require("./products");
const usersRouter = require("./users");
//cart//

apiRouter.use("/orders", ordersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
