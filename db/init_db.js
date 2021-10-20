// code to build and initialize DB goes here
const {
  client
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
        title varchar(255) UNIQUE NOT NULL,
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
        password varchar(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false
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

const rebuildDB = async () => {
  try {
    client.connect();

    await dropTables();
    await createTables();
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

rebuildDB()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());