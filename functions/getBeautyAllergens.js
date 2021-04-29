const fileName = "beautyAllergens.json";
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
  const fallbackLanguage = "en";
  const language = event.queryStringParameters.lang || "en";
  const returnValues = [];
  const items = await response.json();
  Object.entries(items).forEach(([key, data]) => {
    let value = data.name[language];
    if (!value) {
      value = data.name[fallbackLanguage];
    }
    returnValues.push({ key: key, value: value });
  });
  return {
    statusCode: 200,
    body: JSON.stringify(returnValues),
  };
};
