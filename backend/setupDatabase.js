// setupDatabase.js
const { Client } = require('pg');
const knex = require('knex');
const knexConfig = require('./knexfile.js').development;
const dbConfig = require('./createDbConfig');

const databaseName = 'image_processing';

async function createDatabase() {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Check if the database already exists
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname='${databaseName}'`);
    if (res.rowCount === 0) {
      // Database does not exist, create it
      await client.query(`CREATE DATABASE ${databaseName}`);
      console.log(`Database ${databaseName} created successfully`);
    } else {
      console.log(`Database ${databaseName} already exists`);
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
    console.log('Disconnected from PostgreSQL');
  }
}

async function runMigrations() {
  const knexInstance = knex(knexConfig);

  try {
    await knexInstance.migrate.latest();
    console.log('Migrations run successfully');
  } catch (err) {
    console.error('Error running migrations:', err);
  } finally {
    await knexInstance.destroy();
  }
}

async function runSeeds() {
  const knexInstance = knex(knexConfig);

  try {
    await knexInstance.seed.run();
    console.log('Seeds run successfully');
  } catch (err) {
    console.error('Error running seeds:', err);
  } finally {
    await knexInstance.destroy();
  }
}

async function setup() {
  await createDatabase();
  await runMigrations();
  await runSeeds();
}

setup();
