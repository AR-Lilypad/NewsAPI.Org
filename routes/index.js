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

// const mongoose = require("mongoose");
// const db = require("../models");

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
      // let headline = $(element).children("a").text();
      // let blurb = $(element).children("a").text();
      // let link = $(element).children("a").attr("href");
      let result = {};
      result.headline = $(this)
        .find("h2")
        .text();
      result.blurb = $(this)
        .find("p")
        .text();
      result.link = $(this)
        .find("a")
        .attr("href");

      if (reslult.headline !== "" && reslult.link !== "" && result.blurb !== "") {
        if (storiesArray.indexOf(result.headline) == -1) {
          storiesArray.push(result.headline);
        }
        if (result.blurb !== "") {
          blurb.push("No blurb available.")
        };

        Article.count({ title: result.title }, function (err, test) {
          if (test === 0) {
            var entry = new Article(result);

            entry.save(function (err, doc) {
              if (err) {
                console.log(err);
              } else {
                console.log(doc);
              }
            });
          }
        });
      } else {
        console.log("Article already exists.");
      }
       else {
        console.log("Not saved to DB, missing data");
      }
    });
    res.redirect("/");
  });
});


router.get("/", function (req, res) {
  res.render("index", { title: "Washington Post Scraper", condition: false });
});




//         // Insert the data in the wDC-Post db
//         db.Article.insert({
//           title: title,
//           blurb: blurb,
//           link: link
//         },
//           function (err, inserted) {
//             if (err) {
//               // Log the error if one is encountered during the query
//               console.log(err);
//             }
//             else {
//               // Otherwise, log the inserted data
//               console.log(inserted);
//             }
//           });
//       }
//     });
//   })
//   // Send a "Scrape Complete" message to the browser
//   res.send("Scrape Complete");
// })

// // get article from db to populate the DOM
// router.get("/article", function (req, res) {
//   // get every article in array
//   Article.find({})
//     .then(function (Article) {
//       res.json(Article);
//     })
//     .catch(function (err) {
//       res.json(err);
//     });
// });

// // get article by id
// router.get("/article/:id", function (req, res) {
//   // using the id, query db for match
//   Article.findOne({ _id: req.params.id })
//   // populate notes associated with the article/id and execute query
//     .populate("note")
//     .then(function (Article) {
//       res.json(Article);
//     })
//     .catch(function (err) {
//       res.json(err);
//     });
// });

// // save an article
// router.post("/saveArticle", function (req, res) {
//   Article.create(req.body)
//     .then(function (Article) {
//       res.json(Article);
//     })
//     .catch(function (err) {
//       res.json(err);
//     });
// });

// // create a note
// router.post("/article/:id", function (req, res) {
//   Note.create(req.body)
//     .then(function (Note) {
//       return Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: Note._id } }, { new: true });
//     })
//     .then(function (Article) {
//       res.json(Article);
//     })
//     .catch(function (err) {
//       res.json(err);
//     });
// });

// // delete note
// router.delete("/note/:id", function (req, res) {
//   Note.findOneAndDelete({ _id: req.params.id })
//     .then(function (Note) {
//       res.json(Note);
//     })
//     .catch(function (err) {
//       res.json(err);
//     });



//     // delete article
//     router.delete("/article/:id", function (req, res) {
//       Article.findOneAndDelete({ _id: req.params.id })
//       .then(function (Article) {
//         res.json(Article);
//       })
//       .catch(function (err) {
//         res.json(err);
//       });
//     });
//   });

module.exports = router;