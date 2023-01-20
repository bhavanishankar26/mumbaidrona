const express = require("express");
const cors = require("cors");
const compression = require("compression");

const bodyParser = require('body-parser');

module.exports = () => {

    // create express app
    var app = express();

    // use required express plugins

    // // initalize cross domain access
    app.use(cors());

    // initialize compression support
    app.use(compression());

    // initialize body parser
    // json body
    app.use(bodyParser.json({
        limit: "250mb"
    }));

    // form body
    app.use(bodyParser.urlencoded({
        limit: "250mb",
        extended: false,
        parameterLimit: 50000
    }));

    // return created express app
    return app;
};
