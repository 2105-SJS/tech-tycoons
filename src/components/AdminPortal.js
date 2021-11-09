import React, { useState } from "react";
import { useHistory } from 'react-router'

const AdminPortal = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imgURL, setImgURL] = useState('')
    const history = useHistory();

    return <>
        <p>Add Product</p>
        <form onSubmit={async (event) => {
            event.preventDefault();
    
            try {
            const resp = await fetch(`/api/products`, {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imgURL,
                    title, 
                    description, 
                    price, 
                    author, 
                    genre, 
                    inStock: true
                })
            })
            console.log(resp)
            const data = await resp.json()
            console.log(data)
            if (data) {
                history.push('/products')
            }
            }
            catch (error) {
            console.error(error)
            }
    
        }}>
            <input type='text' placeholder='title' value={title} onChange={(event) => setTitle(event.target.value)}></input>
            <input type='text' placeholder='genre' value={genre} onChange={(event) => setGenre(event.target.value)}></input>
            <input type='text' placeholder='description' value={description} onChange={(event) => setDescription(event.target.value)} className='descriptionField'></input>
            <input type='text' placeholder='author' value={author} onChange={(event) => setAuthor(event.target.value)}></input>
            <input type='text' placeholder='imgURL' value={imgURL} onChange={(event) => setImgURL(event.target.value)}></input>
            <input type='text' placeholder='price' value={price} onChange={(event) => setPrice(event.target.value)}></input>
            <button type='submit'>Submit</button>
        </form>
        </>
}

export default AdminPortal