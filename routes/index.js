
const apiRouter = require('express').Router();

apiRouter.use('/products', require('./products'));

apiRouter.use('/users', require('./users'))

apiRouter.use('/products', require('./products'));

module.exports = apiRouter;
