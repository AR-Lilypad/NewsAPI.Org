const express = require("express");
const mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

let PORT = 3000;

// Initialize Express
const app = express();

// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// Routes

// A GET route for scraping the echoJS website
app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://www.washingtonpost.com").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("h2.headline").each(function (i, element) {
            // Save an empty result object
            let headline = $(element).children("a").text();
            let blurb = $(element).children("a").text();
            let link = $(element).children("a").attr("href");

            // If this found element had both a title and a link
            if (title) {
            }
            if ($(element).next().hasClass('blurb')) {
                blurbs.push($(element).next(".blurb").text());
            }
            else {
                blurbs.push("No blurb available")
            }
            if (link) {

            // Insert the data in the scrapedData db
            db.scrapedData.insert({
                title: title,
                blurb: blurb,
                link: link
            },
                function (err, inserted) {
                    if (err) {
                        // Log the error if one is encountered during the query
                        console.log(err);
                    }
                    else {
                        // Otherwise, log the inserted data
                        console.log(inserted);
                    }
                });
        }
    });
});

// Send a "Scrape Complete" message to the browser
res.send("Scrape Complete");
});


// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});
