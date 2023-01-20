#!/usr/bin/env node

"use strict;"

/**
 * Module dependencies.
 */

require("./src/configuration");

const http = require('http');

try {
    const module1App = require('./src/module1');

    var module1Port = normalizePort(process.env.MODULE1_PORT || '8091');
    module1App.set('port', module1Port);

    var module1Server = http.createServer(module1App);

    module1Server.listen(module1Port);
    module1Server.on('error', onError);
    module1Server.on('listening', onListening);
} catch (ex) {
    console.log(ex);
}


try {
    const module2App = require('./src/module2');

    var module2Port = normalizePort(process.env.MODULE2_PORT || '8092');
    module2App.set('port', module2Port);

    var module2Server = http.createServer(module2App);

    module2Server.listen(module2Port);
    module2Server.on('error', onError);
    module2Server.on('listening', onListening);
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
