const faunadb = require("faunadb");
require("dotenv").config();

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async (event, context, callback) => {
  const { identity, user } = context.clientContext;
  const data = JSON.parse(event.body);
  console.log("Function `add-nutritionFavorite` invoked", data);
  if (!!identity && !!user) {
    if (!data.productId) {
      return errror(callback, 400, "ProductId missing.");
    }
    const ratingItem = {
      userId: user.email,
      productId: data.productId,
    };
    const dbItem = await getDbItem(client, ratingItem);
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
      .query(q.Create(q.Collection("nutrition_favorites"), { data: ratingItem }))
      .then(() => {
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
        q.Match(q.Index("nutrition_favorites_by_user_and_product"), [
          ratingItem.userId,
          ratingItem.productId,
        ])
      )
    )
    .then((ret) => ret.data)
    .catch((error) => {
      if (
        error.requestResult.statusCode === 404 &&
        error.description === "Set not found."
      ) {
        return null;
      } else {
        throw new Error(error);
      }
    });
}
