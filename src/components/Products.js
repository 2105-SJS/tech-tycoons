import React, { useEffect, useState } from "react";
import { callApi } from "./util/callApi";

const Products = ({ products, setProducts }) => {
    const [searchTerm, setSearchTerm] = useState('')
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
        <h2 className='title'>
            What Will You Read Next?
        </h2>
        <p>
            <input type="text" placeholder='Search...'          className='searchBar' onChange={event => {
                setSearchTerm(event.target.value)
            }}
            />
        </p>
        <div className='content'>
            {
                products ? products.filter((val) => {
                    if(searchTerm == ''){
                        return val
                    } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map(product => <>
                    <div key={product.id} className='singleProduct'>
                        <h3>
                            {product.title}
                        </h3>
                        <img src={product.imgURL} className='picture'/>
                        <div><em>{product.description}</em></div>
                        <div>${product.price}</div>
                        <button>Add to cart</button>
                    </div>
                </>) : null
            }
        </div>
    </>

}
export default Products