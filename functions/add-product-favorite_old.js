const faunadb = require("faunadb"); /* Import faunaDB sdk */
require("dotenv").config();

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  const { identity, user } = context.clientContext;
  const data = JSON.parse(event.body);
  console.log("Function `add-product-favorite` invoked", data);
  console.log("Identity: ", context);
  console.log("User: ", user);
  if (!!identity && !!user) {
    const ratingItem = {
      userId: data.userId,
      productId: data.productId,
    };
    try {
      return client
        .query(
          q.Create(q.Collection("product_favorites"), { data: ratingItem })
        )
        .then((response) => {
          console.log("success", response);
          /* Success! return the response with statusCode 200 */
          return callback(null, {
            statusCode: 200,
            body: JSON.stringify(response),
          });
        })
        .catch((error) => {
          console.log("error", error);
          /* Error! return the error with statusCode 400 */
          return callback(null, {
            statusCode: 400,
            body: JSON.stringify(error),
          });
        });
    } catch (e) {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(e),
      });
    }
  } else {
    return callback(null, {
      statusCode: 401,
    });
  }
};
