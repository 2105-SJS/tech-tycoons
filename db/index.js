// Connect to DB
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const DB_NAME = 'bookshelf'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);


// database user methods

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
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const { rows: [user] } = await client.query(`
          INSERT INTO users("firstName", "lastName", email, "imgURL", username, password, "isAdmin")
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (username) DO NOTHING
          RETURNING *;
        `, [firstName, lastName, email, imgURL, username, hashedPassword, isAdmin]);
    password = hashedPassword;
    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows: id } = await client.query(`
      SELECT id
      FROM users;
    `);
    const users = await Promise.all(id.map((user) => getUserById(user.id)));

    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserById(user_id) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE id=$1;
    `, [user_id]);

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "Could not find user by tha id",
      }
    }

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1;
    `, [username]);

    return user;
  } catch (error) {
    throw error;
  }
}

// database product methods

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

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM products;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProductsById(productsId) {
  try {
    const { rows: [products] } = await client.query(`
        SELECT *
        FROM products
        WHERE id=$1
      `, [productsId]);

    if (!products) {
      return null;
    }

    return products;
  } catch (error) {
    throw error;
  }
}

// database order methods

async function createOrder({ status, userId }) {
  try {
    const {rows: [orders]} = await client.query(`
      INSERT INTO orders(status, "userId")
      VALUES($1, $2)
      RETURNING *;
    `, [status, userId]);

    return orders;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(id) {
  try {
    const { rows: [order] } = await client.query(`
      SELECT *
      FROM orders
      WHERE id=$1
    `, [id])

    if (!order) {
      return null;
    }

    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
      SELECT *
      FROM orders;
    `);
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByUser({ id }) {
  try {
    const { rows: ordersId } = await client.query(`
      SELECT id
      FROM orders
      WHERE "userId"=${id};
    `);

    const orders = await Promise.all(ordersId.map(
      order => getOrderById(order.id)
    ));

    return orders;
  } catch (error) {
    throw error;
  }
}

// async function getOrdersByProduct({ id }) {
//   try {

//   } catch (error) {
//     throw error;
//   }
// }

async function getCartByUser({ id }) {
  try {
    const {rows: [cart]} = await client.query(`
      SELECT *
      FROM orders
      WHERE "userId"=$1 AND status='created'
    `, [id]);

    return cart;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  createProducts,
  getAllProducts,
  getProductsById,
  createOrder,
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  // getOrdersByProduct,
  getCartByUser
  // db methods
}