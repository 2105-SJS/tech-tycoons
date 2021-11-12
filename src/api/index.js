import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}
//USERS//

export async function createUser(username, email, password) {
  try {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    const token = await data.token;
    storeCurrentUser(token);
  } catch (error) {
    throw error;
  }
}

export async function loginUser() {
  try {
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const { data } = await axios.get("/api/users");
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

export async function createProduct({
  imgURL,
  title,
  description,
  price,
  author,
  genre,
  inStock,
}) {
  try {
    const { data } = await axios.post("/api/products", {
      imgURL,
      title,
      description,
      price,
      author,
      genre,
      inStock,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

