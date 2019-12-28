// // dependencies
const express = require("express");
const router = express.Router();
const path = require("path");

// scraping tools
const axios = require("axios");
const cheerio = require("cheerio");
//  require models
const Article = require('../models/article');
const Note = require('../models/note');


const mongoose = require("mongoose");
const db = require("../models");

// first route for index
router.get("/", function (req, res) {
  res.redirect("./articles");
});

// get request to scrape the website
// scraping route
router.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("http://www.washingtonpost.com").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);
    let storiesArray = [];
    //Now, we grab every h2 within an article tag, and do the following:
    $("h2.headline").each(function (i, element) {
      // Save an empty result object
      let headline = $(element).children("a").text();
      let blurb = $(element).children("a").text();
      let link = $(element).children("a").attr("href");
      // let result = {};
      // result.headline = $(this)
      //   .find("h2")
      //   .text();
      // result.blurb = $(this)
      //   .find("p")
      //   .text();
      // result.link = $(this)
      //   .find("a")
      //   .attr("href");

      // if (headline !== "" && link !== "" && blurb !== "") {
      //   if (storiesArray.indexOf(result.headline) == -1) {
      //     storiesArray.push(result.headline);
      //   }
        if (!blurb) {
          blurb = "No blurb available."
        };

        // Insert the data in the wDC-Post db
        db.Article.insert({
          headline: headline,
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
        // Send a "Scrape Complete" message to the browser
        res.send("Scrape Complete");
      
    });
  })
});



router.get("/article", function (req, res) {
  db.Article.find()
    .sort({ _id: -1 })
    .exec(function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        let article = { article: doc };
        res.render("index", article);
      }
    });
});

router.get("/articles-json", function (req, res) {
  Article.find({}, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});

router.get("/clearAll", function (req, res) {
  Article.remove({}, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log("removed all articles");
    }
  });
  res.redirect("/articles-json");
});

router.get("/readArticle/:id", function (req, res) {
  let articleId = req.params.id;
  let hbsObj = {
    article: [],
    body: []
  };

  Article.findOne({ _id: articleId })
    .populate("note")
    .exec(function (err, doc) {
      if (err) {
        console.log("Error: " + err);
      } else {
        hbsObj.article = doc;
        let link = doc.link;
        request(link, function (error, response, html) {
          var $ = cheerio.load(html);

          $(".l-col__main").each(function (i, element) {
            hbsObj.body = $(this)
              .children(".c-entry-content")
              .children("p")
              .text();

            res.render("article", hbsObj);
            return false;
          });
        });
      }
    });
});
router.post("/note/:id", function (req, res) {
  let user = req.body.name;
  let content = req.body.note;
  let articleId = req.params.id;

  let note = {
    name: user,
    body: content
  };

  let newNote = new Note(note);

  newNote.save(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc._id);
      console.log(articleId);

      Article.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { note: doc._id } },
        { new: true }
      ).exec(function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/readArticle/" + articleId);
        }
      });
    }
  });
});

module.exports = router;
