import { OpenFoodFactsApi } from "openfoodfac-ts";

exports.handler = async function (event, context) {
  const openFoodFactsApi = new OpenFoodFactsApi({
    country: "de",
    userAgent: "Sample Rating App - Web - Version 0.1",
  });
  const product = await openFoodFactsApi.findProductByBarcode("58918274712");

  return {
    statusCode: 200,
    body: JSON.stringify({ message: product }),
  };
};
