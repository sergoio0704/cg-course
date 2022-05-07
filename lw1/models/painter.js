import shapeKind from "./shapeKind.js"

export default class Painter {
    #context

    constructor(context) {
        this.#context = context
    }

    draw = (shape) => {
        switch(shape.getType()) {
            case shapeKind.Rectangle:
                shape.draw(this.#context)
                break
            case shapeKind.Component:
                shape.getShapes().forEach( s => s.draw(this.#context) )
                break
        }
    }
}