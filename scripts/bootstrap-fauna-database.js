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
  return createCollection(client, "nutrition_favorites")
    .then(createCollection(client, "nutrition_ratings"))
    .then(createNutritionIndexes(client))
    .then(createCollection(client, "beauty_favorites"))
    .then(createCollection(client, "beauty_ratings"))
    .then(createBeautyIndexes(client));
}

function createBeautyIndexes(client) {
  const favoritesCollection = "beauty_favorites";
  return createIndex(client, favoritesCollection, "all_beauty_favorites", [])
    .then(
      createIndex(client, favoritesCollection, "beauty_favorites_by_user", [
        { field: ["data", "userId"] },
      ])
    )
    .then(
      createIndex(
        client,
        favoritesCollection,
        "beauty_favorites_by_user_and_product",
        [{ field: ["data", "userId"] }, { field: ["data", "productId"] }]
      )
    )
    .then(createIndex(client, "beauty_ratings", "all_beauty_ratings", []));
}

function createNutritionIndexes(client) {
  return createIndex(
    client,
    "nutrition_favorites",
    "all_nutrition_favorites",
    []
  )
    .then(
      createIndex(
        client,
        "nutrition_favorites",
        "nutrition_favorites_by_user",
        [{ field: ["data", "userId"] }]
      )
    )
    .then(
      createIndex(
        client,
        "nutrition_favorites",
        "nutrition_favorites_by_user_and_product",
        [{ field: ["data", "userId"] }, { field: ["data", "productId"] }]
      )
    )
    .then(
      createIndex(client, "nutrition_ratings", "all_nutrition_ratings", [])
    );
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
