import * as THREE from '../three/build/three.module.js'

var colorsArray = []

export class GeometryDecorator extends THREE.IcosahedronGeometry{
    constructor(radius) {
        super(radius)
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
            if (i % 3 == 0) {
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