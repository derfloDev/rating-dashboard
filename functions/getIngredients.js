const fileName = "ingredients.json";
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
  const language = event.queryStringParameters.lang || "de";
  const ingredients = await response.json();
  const nutritientNames = [];

  Object.entries(ingredients).forEach(([key, value]) => {
    nutritientNames.push({
      key: key.replace(/^[^:]+:/, ""),
      value: value.name[language],
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: nutritientNames }),
  };
};
