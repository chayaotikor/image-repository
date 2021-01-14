const express = require("express");
const parser = require("body-parser");
const fileUpload = require("express-fileupload");
const configureMiddleware = require("../middleware/globalMiddleware");

const server = express();

/* MIDDLEWARE */
configureMiddleware(server);
// x-www-form-urlencoded
server.use(parser.urlencoded({ extended: false }));
// application/json
server.use(parser.json());
server.use(fileUpload()); 

/* ROUTES */

module.exports = server;