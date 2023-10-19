

var side = 50;

const socket = io()
function setup() {

    createCanvas(1500, 1500);
    background('#acacac');
}


function drawfull(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
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

}

socket.on("update matrix", drawfull)