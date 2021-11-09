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
        description varchar(255) NOT NULL,
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
    await createProducts({
      title: 'The Hobbit',
      author: 'J. R. R. Tolkien',
      genre: 'Fantasy',
      description: `The Hobbit is set within Tolkien's fictional universe and follows the quest of home-loving Bilbo Baggins.`,
      price: '11.92',
      inStock: true,
      imgURL: 'https://images-na.ssl-images-amazon.com/images/I/A1E+USP9f8L.jpg'
    });

    await createProducts({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      description: `The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald.`,
      price: '9.30',
      inStock: false,
      imgURL: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781949846386/the-great-gatsby-large-print-9781949846386_hr.jpg'
    });

    await createProducts({
      title: 'The Subtle Art of Not Giving a F*ck',
      author: 'Mark Manson',
      genre: 'Self-help',
      description: `The Subtle Art of Not Giving a Fuck: A Counterintuitive Approach to Living a Good Life.`,
      price: '10.50',
      inStock: true,
      imgURL: 'https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg'
    });

    console.log("Finished creating posts!");
  } catch (error) {
    console.log("Error creating posts!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    await createUser({
      firstName: 'janessa',
      lastName: 'ortiz',
      email: 'janessa@someemail.com',
      imgURL: 'https://www.eduprizeschools.net/wp-content/uploads/2016/06/No_Image_Available.jpg',
      username: 'janessa123',
      password: 'password',
      isAdmin: true
    });
    await createUser({
      firstName: 'kevin',
      lastName: 'kepner',
      email: 'kevin@someemail.com',
      imgURL: 'https://www.eduprizeschools.net/wp-content/uploads/2016/06/No_Image_Available.jpg',
      username: 'kevin123',
      password: 'password',
      isAdmin: true
    });
    await createUser({
      firstName: 'brandon',
      lastName: 'fillpot',
      email: 'brandon@someemail.com',
      imgURL: 'https://www.eduprizeschools.net/wp-content/uploads/2016/06/No_Image_Available.jpg',
      username: 'brandon123',
      password: 'password',
      isAdmin: true
    });
    await createUser({
      firstName: 'jean',
      lastName: 'leconte',
      email: 'jean@someemail.com',
      imgURL: 'https://www.eduprizeschools.net/wp-content/uploads/2016/06/No_Image_Available.jpg',
      username: 'jean123',
      password: 'password',
      isAdmin: false
    });

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialOrders() {
  try {
    console.log("Starting to create orders...");
    const [janessa, kevin, brandon, jean] = await getAllUsers();
    console.log("xxxxx", janessa);

    await createOrder({
      userId: janessa.id,
      status: "created",
      datePlaced: "2021-10-15"
    });

    console.log("Finished creating orders!");
  } catch (error) {
    throw error;
  }
}

async function createInitialOrderProducts() {
  try {
    console.log('starting to create order_products...');
    // const [hobbit, gatsby, subtle] = await addProductToOrder();


    const orderProductsToCreate = [
      {
        orderId: '',
        productId: '',
        price: '',
        quantity: ''
      }
    ]

    const orderProducts = await Promise.all(orderProductsToCreate.map(addProductToOrder));
    console.log('order_products created: ', orderProducts);
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