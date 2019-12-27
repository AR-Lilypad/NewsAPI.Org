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

// 