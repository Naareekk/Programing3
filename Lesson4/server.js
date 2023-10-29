var express = require("express");
var app = express();
const fs = require('fs');
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get("/", function (req, res) {
   res.redirect("index.html");
});

server.listen(3000, function () {

   console.log("App is running on port 3000");

});


let newCount = 0;
let newTraq;

let Grass = require('./grass');
let GrassEater = require('./grassEater');
let Predator = require('./predator');
let Immortal = require('./immortal');
let Bomb = require('./bomb');
let Specialforces = require('./specialforces');

let random = require("./random");

var n = 50
var m = 50

matrix = [];

grassArr = [];
grassEaterArr = [];
predatorArr = [];
immortalArr = [];
bombArr = [];
specialArr = [];


for (let i = 0; i < n; i++) {
   matrix.push([])
   for (let j = 0; j < m; j++) {
      matrix[i].push(0)
   }
}



function characters(index, count) {
   for (let i = 0; i < count; i++) {
      var v = Math.floor(random(n))
      var w = Math.floor(random(m))
      matrix[v][w] = index
   }
}


function setupGame() {



   characters(1, 20)
   characters(2, 10)
   characters(3, 6)
   characters(4, 1)
   characters(5, 0)
   characters(6, 1)
   for (var y = 0; y < matrix.length; ++y) {
      for (var x = 0; x < matrix[y].length; ++x) {
         if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
         }
         else if (matrix[y][x] == 2) {
            var grEa = new GrassEater(x, y, 2);
            grassEaterArr.push(grEa);
         }
         else if (matrix[y][x] == 3) {
            var pre = new Predator(x, y, 3);
            predatorArr.push(pre);
         }
         else if (matrix[y][x] == 4) {
            var bd = new Immortal(x, y, 4);
            immortalArr.push(bd);
         }
         else if (matrix[y][x] == 5) {
            var bmb = new Bomb(x, y, 5);
            bombArr.push(bmb);
         }
         else if (matrix[y][x] == 6) {
            var spec = new Specialforces(x, y, 6);
            specialArr.push(spec);
         }
      }
   }
}

// let newCount = 0;
let speed = 100;

function playGame() {

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
   if (newTraq== true) {
      for (var i in bombArr) {
         bombArr[i].poco();
         newTraq = false
      }
   }
   for (var i in specialArr) {
      specialArr[i].eat();
   }

   if (newCount % 2 == 0) {
      speed = 100
   }
   else {
      speed = 1000
   }
   startPlaying()
   io.emit('update matrix', matrix)
}


let intervalID;






function startPlaying() {
   clearInterval(intervalID)
   intervalID = setInterval(() => {
      playGame()
      console.log(newCount);
      // console.log(bombArr);
      console.log(speed);

   }, speed)
}

io.on('connection', function (socket) {
   socket.emit('update matrix', matrix)
   setupGame()
   startPlaying()
   socket.on('update season', (count) => {
      newCount = count

   });
   socket.on('paytyun', (traq) => {
      newTraq = traq

   });
   socket.on('Total statistics', (data) => {
      fs.writeFileSync('data.json', JSON.stringify(data))
      socket.emit('display statistics', data)
    })
})

