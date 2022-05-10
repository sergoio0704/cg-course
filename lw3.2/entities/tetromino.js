export default class Tetromino {
    constructor(name, matrix, color) {
        this.name = name
        this.matrix = matrix
        this.color = color

        this.row = 0
        this.col = 0
    }

    getName = () => this.name
    getMatrix = () => this.matrix
    getColor = () => this.color
    getRow = () => this.row
    getCol = () => this.col

    setRow = (row) => this.row = row
    setCol = (col) => this.col = col
    setMatrix = (matrix) => this.matrix = matrix
}