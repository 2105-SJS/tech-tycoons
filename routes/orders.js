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
console.log("stripeKey:", STRIPE_SECRET_KEY)
const stripe = require("stripe")(STRIPE_SECRET_KEY);



const calculateOrderAmount = (items) => {
    
    return 1000;
};

ordersRouter.post("/create-payment-intent", async (req, res) => {
    const {items} = req.body;
    console.log('is it there?')
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        payment_method_types: [
           "card",
        ],
    });
    console.log('paymentIntent:', paymentIntent)
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

ordersRouter.post('/', requireUser, async (req, res, next) => {
    try {
        const { id } = req.user;
        const order = await createOrder({ userId: id });
        if (order) {
            res.status(200);
            res.send(order);
        } else {
            res.status(401);
            next({
                name: 'FailedCreateError',
                message: 'This order was not sucessfully created'
            });
        };
    } catch (error) {
        next(error);
    };
});

module.exports = ordersRouter;