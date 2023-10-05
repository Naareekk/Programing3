var matrix = [];
 
 var side = 60;
 var n = 30
 var m = 30
 var grassArr= [];
 var grassEaterArr=[];
 var predatorArr = [];
 var sniperArr = [];
 var immortalArr = [];
 var bombArr = [];
 var specialArr = []
    for (let i = 0; i < n; i++) {
        matrix.push([])
        for(let j = 0; j < m ; j++){
            matrix[i].push(0)
        }
    }
    
    function characters(index,count){
        for (let i = 0; i < count; i++) {
            var v = Math.floor(random(0,n))
            var w = Math.floor(random(0,m))
            matrix[v][w] = index
            
        }
    }
 
 function setup() {
     characters(1,150)
     characters(2,10)
     characters(3,6)
     characters(4,1)
     characters(5,0)
     characters(6,1)
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

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

 
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
 
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if(matrix[y][x] == 2){
                fill("yellow")
            }
            else if(matrix[y][x] == 3){
                fill("red")
            }
            else if(matrix[y][x] == 4){
                fill("orange")
            }
            else if(matrix[y][x] == 5){
                fill("black")
            }
            else if(matrix[y][x] == 6){
                fill("blue")
            }
         
            rect(x * side, y * side, side, side);
        }
    }
     for(var i in grassArr){
        grassArr[i].mul();
    }
    for(var i in grassEaterArr){
        grassEaterArr[i].eat();
    }
    for(var i in predatorArr){
        predatorArr[i].eat();
    }
    for(var i in immortalArr){
        immortalArr[i].eat();
    }
    for(var i in bombArr){
        bombArr[i].eat();
    }
    for(var i in specialArr){
        specialArr[i].eat();
    }
 }
 
