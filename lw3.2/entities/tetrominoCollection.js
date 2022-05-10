import tetrominosConfiguration from "./tetrominosConfiguration.js"
import MathHelper from "../helpers/mathHelper.js"
import Tetromino from "./tetromino.js"

export default class TetrominoCollection {
    #mathHelper
    #tetrominos = []

    constructor() {
        this.#mathHelper = new MathHelper()
        this.generateTetrominos()
    }

    add = (tetromino) => this.#tetrominos.push(tetromino)
    splice = (start, deleteCount) => this.#tetrominos.splice(start, deleteCount)
    pop = () => this.#tetrominos.pop()

    getTetrominos = () => this.#tetrominos
    getLength = () => this.#tetrominos.length

    generateTetrominos = () => {
        const sequence = Object.keys(tetrominosConfiguration)

        let tetrominos = []
        while(sequence.length) {
            const sequenceIndex = this.#mathHelper.getRandomInt(0, sequence.length - 1)
            const tetrominoKey = sequence.splice(sequenceIndex, 1)[0]

            const tetrominoConfigUnit = tetrominosConfiguration[tetrominoKey]
            const tetromino = new Tetromino(tetrominoKey, tetrominoConfigUnit.data, tetrominoConfigUnit.color)
            this.#tetrominos.push(tetromino)
        }
    }
}