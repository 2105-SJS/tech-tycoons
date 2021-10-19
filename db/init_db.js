// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS books;
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
      CREATE TABLE books (
        id SERIAL PRIMARY KEY,
        title varchar(255) UNIQUE NOT NULL,
        author varchar(255) NOT NULL,
        genre varchar(255) NOT NULL,
        description varchar(255) NOT NULL
      );
      `)


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