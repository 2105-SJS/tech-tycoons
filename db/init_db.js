// code to build and initialize DB goes here
const {
  client,
  createUser,
  createProducts
  // other db methods 
} = require('./index');

const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
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
      )
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
        imgURL: '', // do we need this?
        username: 'janessa123',
        password: 'password',
        isAdmin: true
      });
      await createUser({
        firstName: 'kevin',
        lastName: 'kepner',
        email: 'kevin@someemail.com',
        imgURL: '', // do we need this?
        username: 'kevin123',
        password: 'password',
        isAdmin: true
      });
      await createUser({
        firstName: 'brandon',
        lastName: 'fillpot',
        email: 'brandon@someemail.com',
        imgURL: '', // do we need this?
        username: 'brandon123',
        password: 'password',
        isAdmin: true
      });
      await createUser({
        firstName: 'jean',
        lastName: 'leconte',
        email: 'jean@someemail.com',
        imgURL: '', // do we need this?
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



const rebuildDB = async () => {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialProducts();
    await createInitialUsers();
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());