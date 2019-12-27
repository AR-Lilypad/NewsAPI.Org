let cheerio = require("cheerio");
let axios = require("axios");

axios.get("http://www.washingtonpost.com").then(function (res) {
    let $ = cheerio.load(res.data);

    let headline = [];
    let link = [];
    let blurb = [];

    $("h2.headline").each(function (i, element) {
        headline.push($(element).text());
        link.push($(element).children("a").attr("href"));
        if ($(element).next().hasClass('blurb')) {
            blurb.push($(element).next(".blurb").text());
        }
        else{
            blurb.push("No blurb available")
        }

    })

    for (i = 0; i < headlines.length; i++) {
        console.log(headline[i]);
        console.log(blurb[i]);
        console.log(link[i]);
    }
})

