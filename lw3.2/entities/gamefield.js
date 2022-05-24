import config from "../configuration.js"
import TetrominoCollection from "./tetrominoCollection.js";

export default class Gamefield {
    #tetraminosCollection
    #currentTetromino
    #nextTetromino

    #isGameOver = false
    #isGameFinish = false

    constructor() {
        this.current = this.#initGamefield();
        this.#tetraminosCollection = new TetrominoCollection();
        this.#currentTetromino = this.getNextTetromino();
        this.#nextTetromino = this.getNextTetromino();
    }

    setIsGameFinish = () => this.#isGameFinish = true
    getIsGameFinish = () => this.#isGameFinish
    getIsGameOver = () => this.#isGameOver
    getCurrentTetramino = () => this.#currentTetromino
    getNextTetramino = () => this.#nextTetromino

    getNextTetromino = () => {
        if (this.#tetraminosCollection.getLength() === 0) {
            this.#tetraminosCollection.generateTetrominos();
        }

        const tetromino = this.#tetraminosCollection.pop();
        const col = this.current[0].length / 2 - Math.ceil(tetromino.matrix[0].length / 2);
        const row = tetromino.getName() === 'I' ? -1 : -2;

        tetromino.setRow(row);
        tetromino.setCol(col);

        return tetromino;
    }

    placeTetraminoOnGamefield (gameOverFunc) {
        for (let row = 0; row < this.#currentTetromino.matrix.length; row++) {
            for (let col = 0; col < this.#currentTetromino.matrix[row].length; col++) {
              if (this.#currentTetromino.matrix[row][col]) {
                if (this.#currentTetromino.row + row < 0) {
                    this.#isGameOver = true;
                    //
                    return gameOverFunc();
                }
        
                this.current[this.#currentTetromino.row + row][this.#currentTetromino.col + col] = this.#currentTetromino.color;
              }
            }
        }

        let fillLinesCount = 0
        for (let row = this.current.length - 1; row >= 0; ) {
            if (this.current[row].every(cell => !!cell)) {
                fillLinesCount++
                for (let r = row; r >= 0; r--) {
                    for (let c = 0; c < this.current[r].length; c++) {
                        this.current[r][c] = this.current[r-1][c];
                    }
                }
            }
            else {
                row--;
            }
        }
        
        this.#currentTetromino = this.#nextTetromino;
        this.#nextTetromino = this.getNextTetromino();

        return fillLinesCount
    }

    #initGamefield = () => {
        const gamefield = []
        const rowTopOffset =  -2
        for (let row = rowTopOffset; row < config.maxRow; row++) {
            gamefield[row] = []
            for (let col = 0; col < config.maxCol; col++) {
                gamefield[row][col] = 0
            }
        }

        return gamefield
    } 
}