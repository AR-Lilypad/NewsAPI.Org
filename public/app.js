let cheerio = require("cheerio");
let axios = require("axios");

axios.get("http://www.washingtonpost.com").then(function (res) {
    let $ = cheerio.load(res.data);

    let headlines = [];
    let links = [];
    let blurbs = [];

    $("h2.headline").each(function (i, element) {
        headlines.push($(element).text());
        links.push($(element).children("a").attr("href"));
        if ($(element).next().hasClass('blurb')) {
            blurbs.push($(element).next(".blurb").text());
        }
        else{
            blurbs.push("No blurb available")
        }

    })

    for (i = 0; i < headlines.length; i++) {
        console.log(headlines[i]);
        console.log(blurbs[i]);
        console.log(links[i]);
    }
})

// app.get("/articles", function(req, res) {
//     db.Article.find({})
//     .then(function(dbArticle) {
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
//   });
  
//   app.get("/articles/:id", function(req, res) {
//     db.Article.findOne({ _id: req.params.id })
//     .populate("note")
//     .then(function(dbArticle) {
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
//   });
  
//   app.post("/saveArticle", function(req, res) {
//     db.Article.create(req.body)
//     .then(function(dbArticle) {
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
//   });
  
//   app.post("/articles/:id", function(req, res) {
//     db.Note.create(req.body)
//     .then(function(dbNote) {
//       return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push: { note: dbNote._id }}, { new: true });
//     })
//     .then(function(dbArticle) {
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
//   });
  
//   app.delete("/notes/:id", function(req, res) {
//     db.Note.findOneAndDelete({ _id: req.params.id })
//     .then(function(dbNote) {
//       res.json(dbNote);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
//   });
  
//   app.delete("/articles/:id", function(req, res) {
//     db.Article.findOneAndDelete({ _id: req.params.id })
//     .then(function(dbArticle) {
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
//   });