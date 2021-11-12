// code to build and initialize DB goes here
const {
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
  // other db methods 
} = require('./index');

const {
  books
} = require('./seedData');

const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `);


    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

const createTables = async () => {
  try {
    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title varchar(255) NOT NULL,
        author varchar(255) NOT NULL,
        genre varchar(255) NOT NULL,
        description varchar(500) NOT NULL,
        price varchar(255) NOT NULL,
        "inStock" BOOLEAN NOT NULL DEFAULT false,
        "imgURL" varchar(255) DEFAULT 'https://www.eduprizeschools.net/wp-content/uploads/2016/06/No_Image_Available.jpg'
        );

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        "firstName" varchar(255) NOT NULL,
        "lastName" varchar(255) NOT NULL,
        email varchar(255) UNIQUE NOT NULL,
        "imgURL" varchar(255) DEFAULT 'https://www.eduprizeschools.net/wp-content/uploads/2016/06/No_Image_Available.jpg',
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
        
      );

      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        status varchar(255) DEFAULT 'created',
        "datePlaced" DATE DEFAULT CURRENT_DATE
      );

      CREATE TABLE order_products (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        price NUMERIC(5,2) NOT NULL,
        quantity INTEGER DEFAULT 0 NOT NULL,
        UNIQUE("productId", "orderId")
        );
      `);


    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialProducts() {
  try {

    console.log("Starting to create products...");
    await Promise.all(books.map(createProducts));

    console.log("Finished creating products!");
  } catch (error) {
    console.log("Error creating posts!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const usersCreated = [
      {
        firstName: 'janessa',
        lastName: 'ortiz',
        email: 'janessa@someemail.com',
        imgURL: 'https://www.eduprizeschools.net/wp-content/uploads/2016/06/No_Image_Available.jpg',
        username: 'janessa123',
        password: 'password',
        isAdmin: true
      },
      {
        firstName: 'kevin',
        lastName: 'kepner',
        email: 'kevin@someemail.com',
        imgURL: 'https://www.eduprizeschools.net/wp-content/uploads/2016/06/No_Image_Available.jpg',
        username: 'kevin123',
        password: 'password',
        isAdmin: true
      },
      {
        firstName: 'brandon',
        lastName: 'fillpot',
        email: 'brandon@someemail.com',
        imgURL: 'https://www.eduprizeschools.net/wp-content/uploads/2016/06/No_Image_Available.jpg',
        username: 'brandon123',
        password: 'password',
        isAdmin: true
      },
      {
        firstName: 'jean',
        lastName: 'leconte',
        email: 'jean@someemail.com',
        imgURL: 'https://www.eduprizeschools.net/wp-content/uploads/2016/06/No_Image_Available.jpg',
        username: 'jean123',
        password: 'password',
        isAdmin: false
      }
    ];
    const users = await Promise.all(usersCreated.map(createUser));
    console.log('Users created:');
    console.log(users);

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialOrders() {
  try {
    console.log("Starting to create orders...");
    const ordersToCreate = [
      { userId: 2, status: 'created', datePlaced: '2021-11-10' },
      { userId: 1, status: 'completed', datePlaced: '2021-11-05' },
      { userId: 1, status: 'cancelled', datePlaced: '2021-11-06' },
      { userId: 3, status: 'completed', datePlaced: '2021-10-31' },
      { userId: 2, status: 'created', datePlaced: '2021-11-10' },
      { userId: 3, status: 'completed', datePlaced: '2021-11-01' }
    ]
    const orders = await Promise.all(ordersToCreate.map(createOrder));
    console.log('orders created:', orders);

    console.log("Finished creating orders!");
  } catch (error) {
    throw error;
  }
}

async function createInitialOrderProducts() {
  try {
    console.log('starting to create order_products...');
    const productsToAdd = [
      { orderId: 1, productId: 1, price: 11.92, quantity: 1 },
      { orderId: 2, productId: 1, price: 11.92, quantity: 2 },
      { orderId: 3, productId: 1, price: 11.92, quantity: 2 },
      { orderId: 4, productId: 2, price: 10.50, quantity: 1 },
      { orderId: 5, productId: 3, price: 7.89, quantity: 1 },
      { orderId: 6, productId: 3, price: 7.89, quantity: 1 },
      { orderId: 1, productId: 1, price: 11.92, quantity: 2 }
    ]
    const orderProducts = await Promise.all(productsToAdd.map(addProductToOrder));
    console.log('Added products:');
    console.log(orderProducts);
    console.log('Finished creating order_products!');

  } catch (error) {
    console.error(error);
    throw error;
  }
}

const rebuildDB = async () => {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialProducts();
    await createInitialUsers();
    await createInitialOrders();
    await createInitialOrderProducts();
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...")



    console.log("Calling getAllProducts");
    const products = await getAllProducts();
    console.log("Result:", products);

    console.log("Calling getProductsyId with 1");
    const book1 = await getProductsById(1);
    console.log("Result:", book1);

    console.log("Calling getAllOrders");
    const orders = await getAllOrders();
    console.log("Result:", orders);

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());