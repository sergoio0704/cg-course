export default class PlanetMeshRequest {
    constructor(texturePath, sphereGeometryRadius, sphereGeometryWidthSegments, sphereGeometryHeightSegments, phi, orbitRadius) {
        this.texturePath = texturePath
        this.sphereGeometryRadius = sphereGeometryRadius
        this.sphereGeometryWidthSegments = sphereGeometryWidthSegments
        this.sphereGeometryHeightSegments = sphereGeometryHeightSegments
        this.phi = phi
        this.orbitRadius = orbitRadius
    }
}