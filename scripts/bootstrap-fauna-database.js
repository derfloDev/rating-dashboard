/* bootstrap database in your FaunaDB account */
const faunadb = require("faunadb");
const chalk = require("chalk");
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
  return createCollection(client, "product_favorites").then(
    createCollection(client, "product_ratings")
  );
}

function createCollection(client, collectionName) {
  return client
    .query(q.CreateCollection({ name: collectionName }))
    .then((ret) => {
      console.log(ret);
      return client.query(
        q.CreateIndex({
          name: `all_${collectionName}`,
          source: q.Collection(collectionName),
          //   terms: [{ field: ["data", "title"] }],
        })
      );
    })
    .catch((e) => {
      // Database already exists
      console.log("Error_: ", e);
      if (
        e.requestResult.statusCode === 400 &&
        e.message === "instance not unique"
      ) {
        console.log(`Fauna "${collectionName}"already setup! Good to go`);
        console.log(
          'Claim your fauna database with "netlify addons:auth fauna"'
        );
        throw e;
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
