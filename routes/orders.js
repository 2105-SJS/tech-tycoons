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

const {STRIPE_SECRET_KEY} = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
    
    return 1400;
};

ordersRouter.post("/create-payment-intent", async (req, res) => {
    const {items} = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        payment_method_types: [
           "card",
        ],
    });
    res.send ({
        clientSecret: paymentIntent.client_secret,
    });
});

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