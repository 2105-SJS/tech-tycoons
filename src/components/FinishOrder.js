import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { callApi } from './util/callApi';


const CompleteOrder = ({ orders, setOrders, token }) => {

    useEffect(() => {
        const fetchOrders = async () => {

            try {
                const orderResp = await callApi({ url: '/api/orders/cart', token});
                console.log('orderResp:', orderResp)
                if (orderResp) {
                    setOrders(orderResp)
                    for (let i = 0; i < orders.length; i++) {

                        await fetch(`/api/orders/completeorder`, {
                            method: "PATCH",
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: orders[i],
                            token
                        })
                    }
                }
            } catch (error) {
                console.error(error)
            }

        }
        fetchOrders()
    }, [])
    
    
    
    return <>
        <div className='content'>
            <h2>Payment Accepted! Thank You For Your Order.</h2>
        </div>
    </>
}

export default CompleteOrder;