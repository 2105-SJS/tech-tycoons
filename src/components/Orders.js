import React, { useEffect, useState } from "react";
import { callApi } from "./util/callApi";

const Orders = ({ token, orders, setOrders }) => {
    console.log('heresthetoken:', token)
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
    console.log('userOrders:', orders)
    
    return <>
        <h2 className='title'>
            My Cart
        </h2>
        <div className='content'>\
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
    </>

}
export default Orders