let LivingCreature = require("./livingCreature.js");
let random = require("./random.js");

module.exports =class Specialforces extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index)
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
        return super.chooseCell(character);
    }
    eat() {

        let foods = this.chooseCell(5)
        let food = random(foods)
        if (food) {
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[food[1]][food[0]] = 6
            this.x = newX
            this.y = newY
            for (var i in bombArr) {
                if (newX == bombArr[i].x && newY == bombArr[i].y) {
                    bombArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move()
        }
    }
    move() {
        let emptyCells = this.chooseCell(1)
        
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 1
            matrix[newY][newX] = 6
            this.x = newX
            this.y = newY
        }
    }
}

