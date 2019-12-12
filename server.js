// add code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Add the code required to import the `keys.js` file and store it in a variable
const keys = require("./keys.js");

// the dependancies required
let express = require("express");
let cheerio = require("cheerio");
let axios = require("axios");
let fs = require("fs");

let db = require("../models");
let PORT = 8080;

let app = express();


// newsAPI.org request
// let url = 'https://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=41ae37dc17604989849c6c6e7be24750';
axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=41ae37dc17604989849c6c6e7be24750")

    .then(function(response) {
        console.log(response.data);
    })