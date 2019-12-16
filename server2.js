// the dependancies required  
// parses the html and helps find elements
const cheerio = require("cheerio");
// makes the http request for html page
const axios = require("axios");

// Tell the console what server.js is doing
console.log("\n***********************************\n" +
    "Grabbing every thread name and link\n" +
    "from Washington Post's Top Stories:" +
    "\n***********************************\n");

axios.get("http://www.washingtonpost.com").then(function (res) {
    //load the body of the html into cheerio    
    let $ = cheerio.load(res.data);

    //empty the array to save the scraped data
    const results = [];
    
    //with cheerio, find the h2 headlines  
    // (i: iterator.element: the current element)
    $("h2.headline").each(function (i, element) {

        // save the text of the element in a "headline" variable
        let headline = $(element).text();

        // in current selection look at its child elements which are blurb and link
        let link = $(element).children().attr("href");
        if ($(element).next().hasClass('blurb')) {
            blurbs.push($(element).next(".blurb").text());
        }
        else {
            blurbs.push("No blurb available")
        }

        results.push({
            headline: headline,
            link: link,
            blurb: blurb
        });
    });
     
    console.log(results);
});
