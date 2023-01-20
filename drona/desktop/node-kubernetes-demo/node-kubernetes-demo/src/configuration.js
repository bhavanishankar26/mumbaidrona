const dotenv = require("dotenv-safe");
const path = require("path");

try {

    // load environment variables from .env file
    dotenv.config({
        path: path.resolve(process.cwd(), "./.env"),
        allowEmptyValues: false
    });

} catch (ex) {
    // log errors for missing environment variables
    console.error(ex.message);
    process.exit(1);
}
