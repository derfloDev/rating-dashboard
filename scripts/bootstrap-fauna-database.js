/* bootstrap database in your FaunaDB account */
const faunadb = require("faunadb");
const chalk = require("chalk");
const { createIndexedAccessTypeNode } = require("typescript");
require("dotenv").config();
const insideNetlify = insideNetlifyBuildContext();
const q = faunadb.query;

console.log(chalk.cyan("Creating your FaunaDB Database...\n"));

// 1. Check for required enviroment variables
if (!process.env.FAUNADB_SERVER_SECRET) {
  console.log(
    chalk.yellow(
      "Required FAUNADB_SERVER_SECRET enviroment variable not found."
    )
  );
  console.log(
    `Make sure you have created your Fauna databse with "netlify addons:create fauna"`
  );
  console.log(`Then run "npm run bootstrap" to setup your database schema`);
  if (insideNetlify) {
    process.exit(1);
  }
}

// Has var. Do the thing
if (process.env.FAUNADB_SERVER_SECRET) {
  createFaunaDB(process.env.FAUNADB_SERVER_SECRET).then(() => {
    console.log("Fauna Database schema has been created");
    console.log('Claim your fauna database with "netlify addons:auth fauna"');
  });
}

/* idempotent operation */
function createFaunaDB(key) {
  console.log("Create the fauna database schema!");
  const client = new faunadb.Client({
    secret: key,
  });

  /* Based on your requirements, change the schema here */
  return createCollection(client, "product_favorites")
    .then(createCollection(client, "product_ratings"))
    .then(createIndexes(client));
}

function createIndexes(client, collectionName, indexName, terms) {
  return createIndex(client, "product_favorites", "all_product_favorites", [])
    .then(
      createIndex(client, "product_favorites", "product_favorites_by_user", [
        { field: ["data", "userId"] },
      ])
    )
    .then(
      createIndex(
        client,
        "product_favorites",
        "product_favorites_by_user_and_product",
        [{ field: ["data", "userId"] }, { field: ["data", "productId"] }]
      )
    )
    .then(createIndex(client, "product_ratings", "all_product_ratings", []));
}

function createIndex(client, collectionName, indexName, terms) {
  console.log(`Creating index ${collectionName}:${indexName}`);
  return client
    .query(
      q.CreateIndex({
        name: indexName,
        source: q.Collection(collectionName),
        terms: terms,
      })
    )
    .then((ret) => {
      console.log(`Index ${collectionName}:${indexName} created.`);
    })
    .catch((e) => {
      // Database already exists
      //   console.log("Error_: ", e);
      if (
        e.requestResult.statusCode === 400 &&
        e.description === "Index already exists."
      ) {
        console.log(
          `Fauna index ${collectionName}:${indexName} already setup! Good to go`
        );
        // throw e;
      }
    });
}

function createCollection(client, collectionName) {
  return client
    .query(q.CreateCollection({ name: collectionName }))
    .then((ret) => {
      console.log(`Collection ${collectionName} created.`);
    })
    .catch((e) => {
      // Database already exists
      //   console.log("Error_: ", e);
      if (
        e.requestResult.statusCode === 400 &&
        e.message === "instance not unique"
      ) {
        console.log(`Fauna "${collectionName}" already setup! Good to go`);
        console.log(
          'Claim your fauna database with "netlify addons:auth fauna"'
        );
        // throw e;
      }
    });
}

/* util methods */

// Test if inside netlify build context
function insideNetlifyBuildContext() {
  if (process.env.DEPLOY_PRIME_URL) {
    return true;
  }
  return false;
}
