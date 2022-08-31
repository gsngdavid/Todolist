const express = require("express");
const bodyParser = require("body-parser");
const date = require(`${__dirname}/date.js`);

const items = [];
const workItems = [];

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}))

// home route

app.get("/", function(req, res) {
    const day = date.getDay();
    res.render('index', {listTitle: day, addedItems: items});
    
})

app.post("/", function(req, res) {
    let item = req.body.item;
    if(req.body.btn === "Work") {
        workItems.push(req.body.item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
})

// work route

app.get("/work", function(req, res) {
    res.render("index", {listTitle: "Work", addedItems: workItems})
})


app.post("/work", function(req, res) {
    let item = req.body.item;
    workItems.push(item);
    res.redirect("/");
})

// About

app.get("/about", function(req, res) {
    res.render("about", {listTitle: "About"});
})


app.listen(3000, function() {
    console.log("Server is listening on port 3000");
})