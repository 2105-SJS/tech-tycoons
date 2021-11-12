const express = require('express');
const ordersRouter = express.Router();
const { requireAdmin, requireUser } = require('./utils');
const {
    addProductToOrder,
    createOrder,
    getAllOrders,
    getCartByUser,
    getProductById,
    getOrderById,
    getOrderProductByOrderAndProduct,
    updateOrder,
    updateOrderProduct,
    getOrdersByUser
} = require('../db');

ordersRouter.get('/cart', requireUser, async (req, res, next) => { 
    
    try {
        if (req.user){
            const { id } = req.user
            const cart = await getCartByUser({ id });
            console.log('cartlog:', cart)
            res.send(cart)
        }
    } catch ({name, message}) {
        next({
            name: 'Cart Error',
            message: 'Nothing in cart'
        })
    }
});

module.exports = ordersRouter;