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
    getOrdersByUserr, 
    completeOrder
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
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth()+ 1).padStart(2, '0')
    let yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`
    const product = req.body
    try {
        const { id } = req.user;
        const order = await createOrder({ userId: id, status: 'created', datePlaced: today});
        console.log('added to cart:', order)
        if (order) {
            res.status(200);
            const orderProduct = await addProductToOrder({orderId: order.id, productId: product.id, price: product.price, quantity: 1})
            console.log('product added to order', orderProduct)
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

ordersRouter.patch('/completeorder', requireUser, async (req, res, next) => {
    try {
        const { id } = req.body
        const completedOrder = await completeOrder({id: id})
        console.log('completed order:', completedOrder)
        if(completedOrder){
            res.status(200)
        }
    } catch (error) {
        console.error(error)
    }
})

ordersRouter.post('/:orderId/products', requireUser, async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { productId, quantity } = req.body;
        const order = await getOrderById(orderId);
        const product = await getProductById(productId);
        const newPrice = quantity * Number(product.price);
        if (order) {
            console.log(req.user.id)
            if (order.userId !== req.user.id) {
                res.status(401);
                throw new Error('UnauthorizedUser')
            }
            const orderProduct = await getOrderProductByOrderAndProduct({ orderId, productId });
            if (!orderProduct) {
                const newOrderProduct = await addProductToOrder({ orderId, productId, price: newPrice, quantity })
                if (newOrderProduct) {
                    res.status(200);
                    res.send(newOrderProduct);
                } else {
                    res.status(401);
                    next({
                        name: 'FailedCreateError',
                        message: 'The product was not successfully added to the order'
                    });
                };
            } else {
                const { id } = orderProduct;
                const updatedOrderProduct = await updateOrderProduct({ id, price: newPrice, quantity })
                if (updatedOrderProduct) {
                    res.status(200);
                    res.send(updatedOrderProduct);
                } else {
                    res.status(401);
                    next({
                        name: 'FailedUpdateError',
                        message: 'The product was not successfully added to the order'
                    });
                };
            };
        };
    } catch (error) {
        next(error);
    };
});

module.exports = ordersRouter;