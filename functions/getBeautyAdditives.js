const fileName = "beautyAdditives.json";
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const url = `${process.env.URL}/assets/${fileName}`;
  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }

  const returnValues = [];
  const items = await response.json();
  Object.entries(items.tags).forEach(([key, data]) => {
    returnValues.push({
      key: key,
      value: data.name,
      url: data.url,
      products: data.products,
    });
  });
  return {
    statusCode: 200,
    body: JSON.stringify(returnValues),
  };
};
