// dependencies and set handlebars

const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const routes = require("./routes/index.js")

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");


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
let databaseUrl = "wDC-Post";
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/wDC-Post";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect("mongodb://localhost/wDC-Post", { useNewUrlParser: true });

// activate db listener
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to Mongoose!");
});

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

app.use("/", routes);

let port = process.env.PORT || 3000;
// Listen on port 3000
app.listen(port, function () {
  console.log("Listening on PORT:" + port);
});
