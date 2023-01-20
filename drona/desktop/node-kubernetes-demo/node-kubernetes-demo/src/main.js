#!/usr/bin/env node

"use strict;"

/**
 * Module dependencies.
 */

require("./configuration");

const http = require('http');

try {
    const moduleApp = require('./src');

    var modulePort = normalizePort('8090');
    moduleApp.set('port', modulePort);

    var moduleServer = http.createServer(moduleApp);

    moduleServer.listen(modulePort);
    moduleServer.on('error', onError);
    moduleServer.on('listening', onListening);
} catch (ex) {
    console.log(ex);
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error, b, c) {
    debugger;
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof error.port === 'string'
        ? 'Pipe ' + error.port
        : 'Port ' + error.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = this.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;

    var message = 'Listening on ' + bind;
    console.info(message);
}
