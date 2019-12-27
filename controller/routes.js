// dependencies
const express = require("express");
const router = express.Router();

// require models
const Article = require('../models/article');
const Note = require('../models/note');


// scraping route
router.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("http://www.washingtonpost.com").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("h2.headline").each(function (i, element) {
      // Save an empty result object
      let headline = $(element).children("a").text();
      let blurb = $(element).children("a").text();
      let link = $(element).children("a").attr("href");

      // If this found element had both a title and a link
      if (headline) {
      }
      if ($(element).next().hasClass('blurb')) {
        blurbs.push($(element).next(".blurb").text());
      }
      else {
        blurbs.push("No blurb available")
      }
      if (link) {

        // Insert the data in the wDCPost db
        db.wDC-Post.insert({
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
  })
  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
})

// // get article and note from db to populate the DOM
// router.get("/article", function (req, res) {
//   Article.find({})
//     .then(function (Article) {
//       res.json(Article);
//     })
//     .catch(function (err) {
//       res.json(err);
//     });
// });


// router.get("/article/:id", function (req, res) {
//   Article.findOne({ _id: req.params.id })
//     .populate("note")
//     .then(function (Article) {
//       res.json(Article);
//     })
//     .catch(function (err) {
//       res.json(err);
//     });
// });

// router.post("/saveArticle", function (req, res) {
//   Article.create(req.body)
//     .then(function (Article) {
//       res.json(Article);
//     })
//     .catch(function (err) {
//       res.json(err);
//     });
// });

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

// router.delete("/note/:id", function (req, res) {
//   Note.findOneAndDelete({ _id: req.params.id })
//     .then(function (Note) {
//       res.json(Note);
//     })
//     .catch(function (err) {
//       res.json(err);
//     });
// });

// router.delete("/article/:id", function (req, res) {
//   Article.findOneAndDelete({ _id: req.params.id })
//     .then(function (Article) {
//       res.json(Article);
//     })
//     .catch(function (err) {
//       res.json(err);
//     });
// });

// module.exports = router;