const express = require("express");
const ejs = require("ejs");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.set("public", path.resolve("./public"));
app.use(express.static("public"));
app.use(express.urlencoded({extended : false}));

let pLanguages = [];

app.get("/", (req,res)=>{
    res.statusCode = 200;
    res.render("home", {pLanguages});
});

app.post("/register", (req,res)=>{
    const pLanguage = req.body.pLanguage;
    pLanguages.push(pLanguage);
    res.redirect("/");
});

app.get("/contact", (req,res)=>{
    res.statusCode = 200;
    res.render("contact", {});
});

app.use((req,res,next)=>{
    res.statusCode = 404;
    res.send("<h1>404 Not Found</h1>");
});

app.use((err,req,res,next)=>{
    res.statusCode = 500;
    res.send({
        message : "Something Broke!"
    })
});

exports.app = app;

