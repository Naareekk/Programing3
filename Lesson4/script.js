const socket = io()
let side = 30
function setup() {
    createCanvas(1500, 1500);
    background('#acacac');
}


gmp.onclick = function (){
    
   traq = true
   socket.emit("paytyun", traq);

        gmp.style.background = "whitesmoke"
        setTimeout(() => {
            gmp.style.background = "orange"
          },3000);

}

count = 0


season.onclick = function () {
    count++
    if (count % 2 == 0) {
        season.innerHTML = 'Amar'
    }
    else {
        season.innerHTML = 'Dzmer'
    }
    socket.emit("update season", count);

}

function drawful(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1 && season.innerHTML == 'Amar') {
                fill("green");
            }
            else if (matrix[y][x] == 1 && season.innerHTML == 'Dzmer') {
                fill("whitesmoke");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
            }
            else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if (matrix[y][x] == 4) {
                fill("orange")
            }
            else if (matrix[y][x] == 5) {
                fill("black")
            }
            else if (matrix[y][x] == 6) {
                fill("blue")
            }
            rect(x * side, y * side, side, side);
        }
    }

function countAllChar() {
    var allGrassCount = 0;
    var allGrassEaterCount = 0;
    var allPredatorCount = 0;
    var allImmortalCount = 0;

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                allGrassCount++;
                data.allGrass = allGrassCount
            }
            if (matrix[y][x] == 2) {
                allGrassEaterCount++;
                data.allGrassEater = allGrassEaterCount
            }
            if (matrix[y][x] == 3) {
                allPredatorCount++;
                data.allPredatorCount = allPredatorCount
            }
            if (matrix[y][x] == 4) {
                allImmortalCount++;
                data.allImmortalCount = allImmortalCount
            }

        }
    }

    return data
}
    socket.emit('Total statistics', countAllChar())
    socket.on('display statistics', (data) => {
        statistics = data

        var updatedText = '';
        for (var key in statistics) {
            updatedText += '\n' + key + ' ' + statistics[key];
        }
        p.innerText = updatedText;


    })
}

var data = {}

var p = document.createElement('p')
document.body.appendChild(p)



socket.on('update matrix', drawful)