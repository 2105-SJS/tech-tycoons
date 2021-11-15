import React, { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText, Container, Paper, Grid } from '@mui/material'
import { callApi } from "./util/callApi";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from "./Checkout"

const stripePromise = loadStripe('pk_test_51JusunD5T9FRXtu5HaKA85U7PgcMm0WUeGR70beFsYLtCc0Nn6leAI6xdKdJ3KFm2VJin9iSJh98SdyQkznUtXuv00tbmNlpFQ');

const Orders = ({ token, orders, setOrders }) => {
    let total = 0
    useEffect(() => {
        const fetchOrders = async () => {

            try {
                const orderResp = await callApi({ url: '/api/orders/cart', token });
                console.log('orderResp:', orderResp)
                if (orderResp) {
                    setOrders(orderResp)
                    localStorage.setItem('orders', orders)
                    const storage = localStorage.getItem('orders')
                    console.log('storage:', storage)
                    return orderResp
                }
            } catch (error) {
                console.error(error)
            }

        }
        fetchOrders()
    }, [])
    for (let i = 0; i < orders.length; i++) {
        total += Number(orders[i].products[0].price)
    }
    console.log('userOrders:', orders)

    return <>
        <Container component="main" maxWidth="sm" sx={{ mb: 10 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" gutterBottom>
                    Order Summary
                </Typography>
                <List >
                    {
                        orders.map(order => <>
                            <ListItem key={order.id} sx={{ py: 1, px: 5 }}>
                                {
                                    order.products.map(orderProduct => <>
                                        <ListItemText primary={orderProduct.title} secondary={orderProduct.description} />
                                        <img className='cartImg' src={orderProduct.imgURL} />
                                        <Typography variant="body2">${orderProduct.price}</Typography>
                                    </>
                                    )
                                }
                            </ListItem>
                        </>)
                    }
                </List>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        ${total}
                    </Typography>
                </ListItem>
                <Grid>
                    <Typography variant="h6" gutterBottom>
                        Payment method
                    </Typography>
                    <Checkout />
                </Grid>
            </Paper>
        </Container>
    </>

}
export default Orders
