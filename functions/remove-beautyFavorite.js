const faunadb = require("faunadb");
require("dotenv").config();

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async (event, context, callback) => {
  const { identity, user } = context.clientContext;
  const data = JSON.parse(event.body);
  console.log("Function `remove-beautyFavorite` invoked", data);
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
      return removeDbItem(client, dbItem.ref.id, callback);
    } else {
      console.log("Already removed", ratingItem);
      return success(callback);
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

function removeDbItem(client, itemId, callback) {
  try {
    return client
      .query(q.Delete(q.Ref(q.Collection("beauty_favorites"), itemId)))
      .then(() => {
        return success(callback);
      })
      .catch((error) => {
        console.log("error", error);
        return errror(callback, 400, error);
      });
  } catch (error) {
    console.log("error", error);
    return errror(callback, 400, error);
  }
}

function getDbItem(client, ratingItem) {
  return client
    .query(
      q.Get(
        q.Match(q.Index("beauty_favorites_by_user_and_product"), [
          ratingItem.userId,
          ratingItem.productId,
        ])
      )
    )
    .then((ret) => ret)
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
