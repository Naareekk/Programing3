class Immortal {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 1;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    eat() {

        let foods = this.chooseCell(1)
        let food = random(foods)
        if (food) {
            let newX
            let newY
            if (this.energy % 3 != 0) {
                this.energy++;
                matrix[this.y][this.x] = 0
                 newX = food[0]
                 newY = food[1]
                matrix[food[1]][food[0]] = 4
                this.x = newX
                this.y = newY
            }
            else {
                this.energy++;
                matrix[this.y][this.x] = 5

                var bombnew = new Bomb(this.x, this.y, 5);
                bombArr.push(bombnew);

                newX = food[0]
                newY = food[1]
                matrix[food[1]][food[0]] = 4
                this.x = newX
                this.y = newY

     

            }
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
         

             
        }
        else{
            this.move();    
        }
    }

    move() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
        }
    }
}
