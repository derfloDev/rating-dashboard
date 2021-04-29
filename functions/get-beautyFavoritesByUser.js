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
  console.log("Function `get-beautyFavoritesByUser` invoked", user);
  if (!!identity && !!user) {
    const dbItems = await getDbItems(client, user.email);
    if (!!dbItems) {
      return success(callback, dbItems);
    } else {
      return errror(callback, 200, []);
    }
  } else {
    return errror(callback, 401, "");
  }
};

function success(callback, response) {
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(response),
  });
}

function errror(callback, status, error) {
  return callback(null, {
    statusCode: status,
    body: JSON.stringify(error),
  });
}

async function getDbItems(client, email) {
  return client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("beauty_favorites_by_user"), [email])),
        q.Lambda((x) => q.Get(x))
      )
    )
    .then((response) => response.data.map((item) => item.data));
}
