import * as THREE from '../../three/build/three.module.js'

export default class MoonMeshBuilder {
    #planetMeshRequest
    #textureLoader

    constructor(planetMeshRequest) {
        this.#planetMeshRequest = planetMeshRequest
        this.#textureLoader = new THREE.TextureLoader()
    }

    build = () => {
        const geometry = this.#buildGeometry()
        const material = this.#buildMaterial()

        const moonMesh = new THREE.Mesh(geometry, material)

        return moonMesh
    }

    #buildGeometry = () => {
        return new THREE.SphereGeometry(
            this.#planetMeshRequest.sphereGeometryRadius, 
            this.#planetMeshRequest.sphereGeometryWidthSegments, 
            this.#planetMeshRequest.sphereGeometryHeightSegments)
    }

    #buildMaterial = () => {
        return new THREE.MeshLambertMaterial( { map: this.#loadTexture() } )
    }

    #loadTexture = () => {
        return this.#textureLoader.load(this.#planetMeshRequest.texturePath)
    }
}