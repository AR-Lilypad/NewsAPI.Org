// dependencies and set handlebars

const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// requiring models
const db = require("./models");

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
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/wDC-Post";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect("mongodb://localhost/wDC-Post", { useNewUrlParser: true });

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/saved", function (req, res) {
  db.Article.find({})
    .then(function (dbArticle) {
      const hbsObject = {
        articles: dbArticle
      };
      res.render("articles", hbsObject);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// // scraping route
// app.get("/scrape", function (req, res) {
//   // First, we grab the body of the html with axios
//   axios.get("http://www.washingtonpost.com").then(function (response) {
//     // Then, we load that into cheerio and save it to $ for a shorthand selector
//     const $ = cheerio.load(response.data);

//     // Now, we grab every h2 within an article tag, and do the following:
//     $("h2.headline").each(function (i, element) {
//       // Save an empty result object
//       let headline = $(element).children("a").text();
//       let blurb = $(element).children("a").text();
//       let link = $(element).children("a").attr("href");

//       // If this found element had both a title and a link
//       if (headline) {
//       }
//       if ($(element).next().hasClass('blurb')) {
//         blurbs.push($(element).next(".blurb").text());
//       }
//       else {
//         blurbs.push("No blurb available")
//       }
//       if (link) {

// Listen on port 3000
app.listen(3000, function () {
  console.log("App running on localhost:" + PORT);
});
