const apiRouter = require('express').Router();

apiRouter.use('/products', require('./products'));
apiRouter.use('/users', require('./users'))

module.exports = apiRouter;
