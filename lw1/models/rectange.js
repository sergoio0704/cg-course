import Shape from "./shape.js"
import shapeKind from "./shapeKind.js"

export default class Rectangle extends Shape {
    #x
    #y
    #width
    #height

    constructor(x, y, width, height) {
        super(shapeKind.Rectangle)

        this.#x = x
        this.#y = y
        this.#width = width
        this.#height = height        
    }

    getX = () => this.#x
    getY = () => this.#y
    getWidth = () => this.#width
    getHeight = () => this.#height
    
    setX = (x) => { if (x) this.#x = x }
    setY = (y) => { if (y) this.#y = y }

    draw = (context) => {
        context.fillRect(this.#x, this.#y, this.#width, this.#height)
    }
}