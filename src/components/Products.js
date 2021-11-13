import React, { useEffect, useState } from "react";
import { callApi } from "./util/callApi";
import { useHistory } from "react-router";

import { Button, Card, CardContent, CssBaseline, Grid, Typography, Container, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

const Products = ({ products, setProducts, token }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const theme = createTheme();
    const history = useHistory()

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
    const handleAdd = async (product) => {
        try {
            const addedOrder = await callApi({ url: '/api/orders', method: 'POST', token, body: product})
            console.log('did it work?:', addedOrder)
        } catch (error) {
            console.error(error)
        }
        if(addedOrder){
        history.push('/cart')
        }
    }

    return <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container sx={{ p: 4 }} maxWidth="sm">
                <Typography variant="h3" align="center" color="text.primary" gutterBottom>What will you read next?</Typography>
                <Grid item display='flex' alignItems='center'>
                    <SearchIcon textIndent='left' /><TextField id="search" label="Search" type="text" placeholder='Search...' onChange={event => { setSearchTerm(event.target.value) }} autoFocus fullWidth />
                </Grid>
            </Container>
            <Container sx={{ py: 3 }} maxWidth="xl">
                <Grid container spacing={4} alignItems="flex-end">
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className='content'>
                            {
                                products ? products.filter((val) => {
                                    if (searchTerm == '') {
                                        return val
                                    } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return val
                                    }
                                }).map(product => <>
                                    <div key={product.id} className='singleProduct'>
                                        <Typography gutterBottom p={2} variant="h6" align="center" color="black">{product.title}</Typography>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography>
                                                <img src={product.imgURL} className='picture' />
                                                <h4>By: {product.author}</h4>
                                                <em>{product.description}</em>
                                                <h4>${product.price}</h4>
                                                <Button onClick={() => {
                                                    handleAdd(product)}}startIcon={<ShoppingCartIcon />} variant="text">Add to cart</Button>
                                            </Typography>
                                        </CardContent>
                                    </div>
                                </>) : null
                            }
                        </div>
                    </Card>
                </Grid>
            </Container>
        </ThemeProvider>
    </>

}
export default Products