require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const app = express();
const port = process.env.PORT || 5000;


app.set("view engine", "ejs");
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
        message : "Something Broke!",
        msg : err.message,
        error : err
    })
});



app.listen(port, ()=>{
    console.log(`Server is runnig at http://localhost:${port}`);
});