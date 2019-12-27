// dependencies and set handlebars

const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const router = require("./controller/routes")

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

let PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// establish handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/wDC-Post", { useNewUrlParser: true });

// set up Routes in controller
require("./controller/routes");

// Listen on port 3000
app.listen(3000, function () {
  console.log("App running on localhost:" + PORT);
});
