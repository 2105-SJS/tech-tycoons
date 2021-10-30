const usersRouter = require('./users');

const apiRouter = require('express').Router();

apiRouter.use('/products', require('./products'));
usersRouter.use('users', require('./users'))

module.exports = apiRouter;
