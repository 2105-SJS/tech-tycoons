import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

//Products//

export async function getAllProducts() {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createProduct({
  img_url,
  title,
  description,
  price,
  author,
  genre,
  inventory
}) {
  try {
    const { data } = await axios.post("/api/products", {
      img_url,
      title,
      description,
      price,
      author,
      genre,
      inventory
    });
    return data;
  } catch (error) {
    throw error;
  }
}

