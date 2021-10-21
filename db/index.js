// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'bookshelf'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

async function createUser({
  firstName,
  lastName,
  email,
  imgURL,
  username,
  password,
  isAdmin
}) {
  try {
    const { rows: [user] } = await client.query(`
          INSERT INTO users("firstName", "lastName", email, "imgURL", username, password, "isAdmin")
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (username) DO NOTHING
          RETURNING *;
        `, [firstName, lastName, email, imgURL, username, password, isAdmin]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function createProducts({
  title,
  author,
  genre,
  description,
  price,
  inStock,
  imgURL
}) {
  try {
    const { rows: [product] } = await client.query(`
      INSERT INTO products(title, author, genre, description, price, "inStock", "imgURL") 
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `, [title, author, genre, description, price, inStock, imgURL]);
    
    return product;
  } catch (error) {
    throw error;
  }
}


// export
module.exports = {
  client,
  createUser,
  createProducts
  // db methods
}