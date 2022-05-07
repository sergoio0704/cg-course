import { util } from "../util.js"
import Shape from "./shape.js";
import shapeKind from "./shapeKind.js";

export default class Component extends Shape{
    #shapes
    #color

    constructor(shapes) {
        super(shapeKind.Component)

        this.#shapes = [].concat(shapes)
        this.#color = util.generateRGBColorString();
    }

    getX = () => Math.min.apply(null, this.#shapes.map( s => s.getX() ) )
    getY = () => Math.min.apply(null, this.#shapes.map( s => s.getY() ) )
    getColor = () => this.#color

    setY = (y) => {
        const diff = y - this.getY()
        for ( const shape of this.#shapes )
        {
            shape.setY(shape.getY() + diff)
        }
    }

    updateColor = () => this.#color = util.generateRGBColorString()

    getShapes = () => this.#shapes
}