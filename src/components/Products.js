import React, { useEffect } from "react";
import { callApi } from "./util/callApi";

const Products = ({ products, setProducts }) => {

    useEffect(() => {
        const fetchProducts = async () => {

            try {
                const prodResp = await callApi({ url: '/api/products' });
                if (prodResp) {
                    setProducts(prodResp.products)
                    return prodResp
                }
            } catch (error) {
                console.error(error)
            }

        }
        fetchProducts()
    }, [])
    console.log('products:', products)


    return <>
        <h1 className='title'>
            Products
        </h1>
        <div className='content'>
            {
                products ? products.map(product => <>
                    <div key={product.id} className='singleRoutine'>
                        <h3>
                            {product.title}
                        </h3>
                        <div>{product.description}</div>
                    </div>
                </>) : null
            }
        </div>
    </>

}
export default Products