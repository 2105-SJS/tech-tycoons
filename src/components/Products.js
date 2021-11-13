import React, { useEffect, useState } from "react";
import { callApi } from "./util/callApi";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Products = ({ products, setProducts, token }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const theme = createTheme();

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
    }

    return <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container sx={{ p: 4 }} maxWidth="sm">
                <Typography variant="h3" align="center" color="text.primary" gutterBottom>What will you read next?</Typography>
                <Grid item display='flex' alignItems='center'>
                    <SearchIcon textIndent='left'/><TextField id="search" label="Search" type="text" placeholder='Search...' onChange={event => { setSearchTerm(event.target.value) }} autoFocus fullWidth />
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
                                                <div><em>{product.description}</em></div>
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