export default class MoveableShape {
    #shape
    #speedY

    #minY
    #maxY

    #motionTime

    constructor(shape, speedY) {
        this.#shape = shape
        this.#speedY = speedY

        this.#minY = 0
        this.#maxY = 80

        this.#motionTime = 0
    }

    move = () => {
        const y = this.#shape.getY()

        const newSpeed = y + this.#speedY * this.#motionTime

        if (newSpeed > this.#maxY ) {
            this.#speedY *= - 1
            this.#motionTime = 0
        }

        if (newSpeed < this.#minY) {
           this.#speedY *= - 1
           this.#motionTime = 0
        }

        this.#motionTime += 0.5
        this.#shape.setY(y + this.#speedY * this.#motionTime)
    }

    getShape = () => this.#shape
}