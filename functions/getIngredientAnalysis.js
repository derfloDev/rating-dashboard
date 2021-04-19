const path = require("path")
const fs = require("fs")
const fileName = "./ingredientAnalysis.json"
const resolved = (process.env.LAMBDA_TASK_ROOT) ? path.resolve(process.env.LAMBDA_TASK_ROOT, fileName) : path.resolve(__dirname, fileName)


exports.handler = async function (event, context) {
    const language = event.queryStringParameters.lang || 'de';
    const promise = new Promise((resolve, reject) => {
        fs.readFile(resolved, "utf8", (err, results) => ingredientNames = resolve(JSON.parse(results)))
    })
    const ingredients = await promise;
    const nutritientNames = [];

    Object.entries(ingredients).forEach(
        ([key, value]) => {
            nutritientNames.push({ key: key, value: value.name[language] })
        }
    );
    return {
        statusCode: 200,
        body: JSON.stringify({ message: nutritientNames })
    };
}