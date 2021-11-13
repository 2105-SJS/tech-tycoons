// Connect to DB
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const DB_NAME = 'bookshelf'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);


// -------------------------------------------- DATABASE USER METHODS

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
    console.log(user)
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE username = $1;
    `, [username]);
    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      delete hashedPassword;
      return user;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const _getOrderById = async (id) => {
  try {
      const { rows: [order]} = await client.query (`
          SELECT * FROM orders
          WHERE id = $1;
      `,[id]);
      return order;
  } catch (error) {
      console.error(error);
  };
};

const _joinOrderProducts = async (orderId) => {
  try {
      const order = await _getOrderById(orderId);
      const orderProducts = await getOrderProductsByOrder({id: orderId});
      order.products = [];
      await Promise.all(orderProducts.map(async (orderProduct) => {
          const product = await getProductById(orderProduct.productId);
          product.price = orderProduct.price;
          product.quantity = orderProduct.quantity;
          order.products.push(product);
      }))
      return order;
  } catch (error) {
      console.error (error);
  };
};

const getOrderProductsByOrder = async ({ id: orderId }) => {
  try {
      const { rows: orderProducts } = await client.query (`
          SELECT * FROM order_products
          WHERE "orderId" = $1;
      `,[orderId]);
      return orderProducts;
  } catch (error) {
      console.error (error);
  };
};

async function getAllUsers() {
  try {
    const { rows: id } = await client.query(`
      SELECT id
      FROM users;
    `);
    const users = await Promise.all(id.map((user) => getUserById(user.id)));

    return users;
  } catch (error) {
    console.error(error);
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
        message: "Could not find user by the id",
      }
    }

    delete user.password;

    return user;
  } catch (error) {
    console.error(error);
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
    console.error(error);
    throw error;
  }
}

// -------------------------------------------- DATABASE PRODUCT METHODS

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

    console.log('xxxxx', product)
    return product;
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    throw error;
  }
}

// -------------------------------------------- DATABASE ORDER METHODS

async function createOrder({ status, userId, datePlaced }) {
  try {
    const { rows: [order] } = await client.query(`
      INSERT INTO orders(status, "userId", "datePlaced")
      VALUES($1, $2, $3)
      RETURNING *;
    `, [status, userId, datePlaced]);

    return order;
  } catch (error) {
    console.error(error);
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
    console.error(error);
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
      SELECT *
      FROM orders;
    `);

    const productAndOrder = await Promise.all(orders.map(async (order) => {
      const resp = await _getProductsByOrderId(order.id);
      return resp;
    }));

    return productAndOrder;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getOrdersByUser({ id }) {
  try {
    const { rows } = await client.query(`
      SELECT *, users.id AS "creatorId"
      FROM orders
      JOIN users ON orders."creatorId"=users.id
      WHERE username = $1;
    `, [id]);
    for (let order of rows) {
      order.products = await _getProductsByOrderId(order.id);
    }

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getOrdersByProduct({ id }) {
  try {
    const { rows: ordersId } = await client.query(`
      SELECT orders.id
      FROM orders
      JOIN order_products ON orders.id=order_products."orderId"
      JOIN products ON products.id=order_products."productId"
      WHERE products.id=$1;
    `, [id]);

    return await Promise.all(ordersId.map(
      order => getOrderById(order.id)
    ));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getCartByUser = async ({ id }) => {
  try {
      const { rows: orders } = await client.query(`
          SELECT * FROM orders
          WHERE "userId" = $1 AND status IN ('created');
      `,[id]);
      const orderProducts = await Promise.all(orders.map(async (order) => {
          const orderProduct = _joinOrderProducts(order.id);
          return orderProduct;
      }));
      return orderProducts;
  } catch (error) {
      console.error (error);
  };
};

// -------------------------------------------- DATABASE ORDER PRODUCTS METHODS

async function getOrderProductById(id) {
  try {
    const { rows: [order_product] } = await client.query(`
      SELECT * FROM order_products
      WHERE id = $1;
    `, [id]);

    return order_product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function addProductToOrder({ orderId, productId, price, quantity }) {
  try {
    const { rows: [order_products] } = await client.query(`
          INSERT INTO order_products ("orderId", "productId", price, quantity)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT ("orderId", "productId") DO UPDATE
          SET price = $3, quantity = $4
          RETURNING *;
      `, [orderId, productId, price, quantity]);
    return order_products;
  } catch (error) {
    console.error(error)
  };
};

async function updateOrderProduct({ id, price, quantity }) {
  try {
    const { rows: [order_product] } = await client.query(`
      UPDATE order_products
      SET price = $1, quantity = $2
      WHERE id = ${id}
      RETURNING *;
    `, [id, price, quantity]);

    return order_product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getProductById = async (id) => {
  try {
      const { rows: [product] } = await client.query(`
      SELECT *
      FROM products
      WHERE id=$1;
    `, [id]);
      return product;
  } catch (error) {
      throw error;
  }
}

async function destroyOrderProduct(id) {
  try {
    const { rows: [order_product] } = await client.query(`
      DELETE FROM order_products
      WHERE id = $1
      RETURNING *;
    `, [id]);

    return order_product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// -------------------------------------------- DATABASE CHECKOUT METHODS

async function updateOrder({ id, status, userId }) {
  try {
    const { rows: [order] } = await client.query(`
      UPDATE orders
      SET status = $1, "userId" = $2
      WHERE id = $3
      RETURNING *;
    `, [status, userId, id]);

    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function completeOrder({ id }) {
  try {
    const { rows: [order] } = await client.query(`
      UPDATE orders
      SET status = 'completed'
      WHERE id = $1
      RETURNING *;
    `, [id]);

    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function cancelOrder(id) {
  try {
    const { rows: [order] } = await client.query(`
      UPDATE orders
      SET status = 'cancelled'
      WHERE id = $1
      RETURNING *;
    `, [id]);

    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// -------------------------------------------- DATABASE ADMIN METHODS

async function destroyProduct({ id }) {
  // make sure the orders for the order_products being deleted do not have a status = completed
  try {
    await client.query(`
      DELETE FROM order_products
      WHERE order_products."orderId"=$1;
    `, [id]);
    const { rows: [product] } = await client.query(`
      DELETE FROM orders
      WHERE orders.id=$1
      RETURNING *;
    `, [id]);

    return product;
  } catch (error) {

  }

}

async function updateProduct({
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
      UPDATE products
      SET title=$1, author=$2, genre=$3, description=$4, price=$5, "inStock"=$6, "imgURL"=$7
      WHERE id=$8
      RETURNING *;
    `, [title, author, genre, description, price, inStock, imgURL]);

    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateUser({
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
      UPDATE users
      SET "firstName"=$1, "lastName=$2, email=$3, "imgURL"=$4, username=$5, password=$6, "isAdmin"=$7
      WHERE id=$8
      RETURNING *;
    `, [firstName, lastName, email, imgURL, username, password, isAdmin]);

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

// -------------------------------------------- HELPER METHODS

async function _getProductsByOrderId(orderId) {
  try {
    const { rows: products } = await client.query(`
      SELECT *
      FROM products
      JOIN order_products ON products.id=order_products."productId"
      WHERE order_products."orderId"=$1;
    `, [orderId]);

    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export
module.exports = {
  client,
  createUser,
  getUser,
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
  getOrdersByProduct,
  getCartByUser,
  getOrderProductById,
  addProductToOrder,
  updateOrderProduct,
  destroyOrderProduct,
  updateOrder,
  completeOrder,
  cancelOrder,
  _getProductsByOrderId,
  destroyProduct,
  updateProduct,
  updateUser
  // db methods
}