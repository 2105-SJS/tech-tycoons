import React, { useState } from "react";
import { useHistory } from 'react-router'

const AdminPortal = ({admin}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imgURL, setImgURL] = useState('')
    const history = useHistory();

    return <>
        { admin ? <>
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
    
        }} className='singleProduct'>
            <p>
                <input type='text' placeholder='Title...' value={title} onChange={(event) => setTitle(event.target.value)} className='input'></input>
            </p>
            <p>
                <input type='text' placeholder='Genre...' value={genre} onChange={(event) => setGenre(event.target.value)} className='input'></input>
            </p>
            <p>
                <input type='text' placeholder='Description...' value={description} onChange={(event) => setDescription(event.target.value)} className='DescriptionField' className='description'></input>
            </p>
            <p>
                <input type='text' placeholder='Author...' value={author} onChange={(event) => setAuthor(event.target.value)} className='input'></input>
            </p>
            <p>
                <input type='text' placeholder='imgURL...' value={imgURL} onChange={(event) => setImgURL(event.target.value)} className='input'></input>
            </p>
            <p>
                <input type='text' placeholder='Price...' value={price} onChange={(event) => setPrice(event.target.value)} className='input'></input>
            </p>
            <p>
                <button type='submit'>Submit</button>
            </p>
        </form>
        </>
        : null }
        </>
}

export default AdminPortal