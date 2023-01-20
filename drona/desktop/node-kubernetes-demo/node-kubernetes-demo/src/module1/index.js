const express = require("./express");

const { GetConnection } = require('./mongodb');
const { ExecuteQuery } = require("./mysql");

var app = express();

app.use(async (req, res, next) => {

    var resp = { "server": "module1" }

    try {
        resp["mongodb"] = await getDataFromMongoDB();
    } catch (ex) {
        resp["mongodb"] = ex;
    }

    try {
        resp["mysqldb"] = await getDataFromMySql();
    } catch (ex) {
        resp["mysqldb"] = ex;
    }

    res.send('<pre>' + JSON.stringify(resp, null, '\t') + '</pre>');
});

const getDataFromMongoDB = async () => {
    var client = await GetConnection();
    var db = client.db(process.env.DHQ_MONGODB_DATABASE);
    var collection = db.collection("studio_license_available");
    let filter = {}
    var result = await collection.findOne(filter);
    client.close();
    return result;
}
const getDataFromMySql = async () => {
    var query = "select * from channel limit 1;";
    let result = await ExecuteQuery(query, {});

    if (result.length == 0)
        return {};
    else
        return result[0];
}

module.exports = app;
