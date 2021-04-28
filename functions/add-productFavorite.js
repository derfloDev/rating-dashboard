const faunadb = require("faunadb"); /* Import faunaDB sdk */
require("dotenv").config();

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

/* export our lambda function as named "handler" export */
exports.handler = async (event, context, callback) => {
  const { identity, user } = context.clientContext;
  const data = JSON.parse(event.body);
  console.log("Function `add-product-favorite` invoked", data);
  // console.log("Identity: ", context);
  // console.log("User: ", user);
  if (!!identity && !!user) {
    const ratingItem = {
      userId: user.email,
      productId: data.productId,
    };
    const dbItem = await getDbItem(client, ratingItem);
    console.log("dbItem", dbItem);
    if (!!dbItem) {
      console.log("Already added", ratingItem);
      return success(callback);
    } else {
      return addDbItem(client, ratingItem, callback);
    }
  } else {
    return errror(callback, 401, "");
  }
};

function success(callback) {
  return callback(null, {
    statusCode: 200,
    body: "",
  });
}

function errror(callback, status, error) {
  return callback(null, {
    statusCode: status,
    body: JSON.stringify(error),
  });
}

function addDbItem(client, ratingItem, callback) {
  try {
    return client
      .query(q.Create(q.Collection("product_favorites"), { data: ratingItem }))
      .then((response) => {
        return success(callback);
      })
      .catch((error) => {
        console.log("error", error);
        return errror(callback, 400, error);
      });
  } catch (error) {
    return errror(callback, 400, error);
  }
}

function getDbItem(client, ratingItem) {
  return client
    .query(
      q.Get(
        q.Match(q.Index("product_favorites_by_user_and_product"), [
          ratingItem.email,
          ratingItem.productId,
        ])
      )
    )
    .then((ret) => ret.data)
    .catch((error) => {
      if (
        error.requestResult === 404 &&
        error.description === "Set not found."
      ) {
        return null;
      }
    });
}
