import React, { useEffect, useState } from "react";
import { callApi } from "./util/callApi";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Checkout from "./Checkout"

const stripePromise = loadStripe('pk_test_51JusunD5T9FRXtu5HaKA85U7PgcMm0WUeGR70beFsYLtCc0Nn6leAI6xdKdJ3KFm2VJin9iSJh98SdyQkznUtXuv00tbmNlpFQ');

const Orders = ({ token, orders, setOrders }) => {
    let total = 0
    useEffect(() => {
        const fetchOrders = async () => {

            try {
                const orderResp = await callApi({ url: '/api/orders/cart', token});
                console.log('orderResp:', orderResp)
                if (orderResp) {
                    setOrders(orderResp)
                    return orderResp
                }
            } catch (error) {
                console.error(error)
            }

        }
        fetchOrders()
    }, [])
    for(let i = 0; i < orders.length; i++){
        total += Number(orders[i].products[0].price)
    }
    console.log('userOrders:', orders)
    
    return <>
        <h2 className='title'>
            My Cart
        </h2>
        <div className='cartContent'>
            {
                orders.map(order => <>
                    <div key={order.id} className='singleCart'>
                        {
                            order.products.map(orderProduct => <>
                                <div><img className='cartImg' src={orderProduct.imgURL}/>{orderProduct.title}.....{orderProduct.price}</div>
                                </>
                            )
                        }
                    </div>
                
                </>)
            }
        </div>
        <h2>${total}</h2>
        <div>
            <Checkout />
        </div>
    </>

}
export default Orders
