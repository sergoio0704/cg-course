import * as THREE from '../../three/build/three.module.js'

/*
Уравнение окружности радиуса R в полярных координатах

𝒙 = 𝑹𝐜𝐨𝐬 𝝋 ,
𝒚 = 𝑹𝐬𝐢𝐧 𝝋 ,
𝟎 ≤ 𝝋 ≤ 𝟐𝝅.

*/

export default class EarthMeshBuilder {
    #planetMeshRequest
    #textureLoader

    constructor(planetMeshRequest) {
        this.#planetMeshRequest = planetMeshRequest
        this.#textureLoader = new THREE.TextureLoader()
    }

    build = () => {
        const geometry = this.#buildGeometry()
        const material = this.#buildMaterial()

        const earthMesh = new THREE.Mesh(geometry, material)

        return earthMesh
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