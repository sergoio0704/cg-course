import * as THREE from "https://cdn.skypack.dev/three"
import { ParametricGeometry } from "./three/examples/jsm/geometries/ParametricGeometry.js"

var colorsArray = []

export class GeometryDecorator extends ParametricGeometry{
    #slices 
    #stacks

    constructor(func, slices, stacks) {
        super(func, slices, stacks)

        this.#slices = slices
        this.#stacks = stacks
    }

    paintFaces = () => {
        this.#initGeometryColors()
        return this
    }

    getGeometry = () => this

    #initGeometryColors = () => {
        this.setAttribute(
            "color",
            new THREE.BufferAttribute(new Float32Array(this.attributes.position.count * 3), 3)
        )
        let colorSettings = generateUniqueRgbColor()
        for (let i = 0; i < this.attributes.position.count; i++) {
            if (i % ( Math.round(this.attributes.position.count / 6) ) == 0) {
                colorSettings  = generateUniqueRgbColor()
            }
            this.attributes.color.setXYZ(i, colorSettings.r, colorSettings.g, colorSettings.b)
        }
    }
}

function generateUniqueRgbColor() {
    let r,g,b,composite

    do {
        r = Math.random()
        g = Math.random()
        b = Math.random()

        composite = `${r}${g}${b}`
        if(!colorsArray.includes(composite)) {
            colorsArray.push(composite)
            return {r,g,b}
        }
    } while(colorsArray.includes(composite))
}