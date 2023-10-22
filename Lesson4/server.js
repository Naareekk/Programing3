

var express = require("express");

var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static("."));

app.get("/", function (req, res) {

res.redirect("index.html");

});

server.listen(3000, function () {

console.log("App is running on port 3000");

});

let Bomb = require("./bomb.js");
let Grass = require("./class.js");
let GrassEater = require("./grassEater.js");
let Immortal = require("./immortal.js");
let Predator = require("./predator.js");
let Sniper = require("./sniper.js");
let random = require("./random.js");
let Specialforces = require("./specialforces.js")


matrix = [];

var n = 30
var m = 30

 grassArr= [];
 grassEaterArr=[];
 predatorArr = [];
 sniperArr = [];
 immortalArr = [];
 bombArr = [];
 specialArr = []

    for (let i = 0; i < n; i++) {
        matrix.push([])
        for(let j = 0; j < m ; j++){
            matrix[i].push(0)
        }
    }
    
    function characters(index,count){
        for (let i = 0; i < count; i++) {
            var v = Math.floor(random(n))
            var w = Math.floor(random(m))
            matrix[v][w] = index
            
        }
    }




    function setUpGame(){
      characters(1,100)
      characters(2,10)
      characters(3,6)
      characters(4,1)
      characters(5,0)
      characters(6,1)

      for(var y = 0; y < matrix.length; ++y){
         for(var x = 0; x < matrix[y].length; ++x){
             if(matrix[y][x] == 1){
                 var gr = new Grass(x,y,1);
                 grassArr.push(gr);
             }
             else if(matrix[y][x] == 2){
                 var grEa = new GrassEater(x,y,2);
                 grassEaterArr.push(grEa);
             }
             else if(matrix[y][x] == 3){
                 var pre = new Predator(x,y,3);
                 predatorArr.push(pre);
             }
             else if(matrix[y][x] == 4){
                 var imm = new Immortal(x,y,4);
                 immortalArr.push(imm);
             }
             else if(matrix[y][x] == 5){
                 var bmm = new Bomb(x,y,5);
                 bombArr.push(bmm);
             }
             else if(matrix[y][x] == 6){
                 var sf = new Specialforces(x,y,6);
                 specialArr.push(sf);
             }
         }
      }
    }


    function playGame(){
      for (var i in grassArr) {
         grassArr[i].mul();
     }
     for (var i in grassEaterArr) {
         grassEaterArr[i].eat();
     }
     for (var i in predatorArr) {
         predatorArr[i].eat();
     }
     for (var i in immortalArr) {
         immortalArr[i].eat();
     }
     for (var i in bombArr) {
         bombArr[i].eat();
     }
     for (var i in specialArr) {
         specialArr[i].eat();
     }
     io.emit("update matrix", matrix)
    }
    
    // let but = document.createElement("button")
    // but.setAttribute("id", "button1")
    // but.addEventListener("click", poco)
    // function poco(){
    //     console.log("aaa");
        
    // }

      
    let intervalID;

    function startPlaying(){
       clearInterval(intervalID)
       intervalID = setInterval(() => {
          playGame()
       },1000)
    }


    io.on("connection", function(socket){
        socket.emit("update matrix", matrix)
        setUpGame()    
        startPlaying()
       })