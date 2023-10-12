// var express = require("express");
// var app = express();

// app.get("/name/:search", function(req, res){
//    var search = req.params.search
//    // res.send("<h1>Hello world</h1>");
//    res.redirect("https://google.com/search?q=" + search)
// });
// app.get("/*", function(req, res){
//  res.status(404).send("page not found")
// });


// app.listen(3000, function(){
//    console.log("Example is running on port 3000");
// });


var express = require("express");
var app = express();

app.use(express.static("."));

app.get("/", function(req, res){
   res.redirect("index.html");
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});

