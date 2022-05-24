import * as THREE from '../three/build/three.module.js'
import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js'
import EarthMeshBuilder from './builders/earthMeshBuilder.js'
import MoonMeshBuilder from './builders/moonMeshBuilder.js'
import PlanetMeshRequest from './builders/requests/planetMeshRequest.js'
import SunMeshBuilder from './builders/sunMeshBuilder.js'

var controls
var width
var height
var container
var camera
var scene
var renderer

//Earth
var earthBase = new THREE.Object3D()
var earthMesh
var earthTexturePath = "./textures/earth.jpg"
var earthGeometryRadius = 80
var earthGeometryWidthSegments = 64
var earthGeometryHeightSegments = 32
var earthPhi = -Math.PI / 10
var earthOrbitRadius = 2000

//Sun
var sunBase = new THREE.Object3D()
var sunMesh
var sunTexturePath = "./textures/sun.jpg"
var sunGeometryRadius = 800
var sunGeometryWidthSegments = 64
var sunGeometryHeightSegments = 64
var sunPhi = -Math.PI / 3
var sunOrbitRadius = 1

//Moon
var moonBase = new THREE.Object3D()
var moonMesh
var moonTexturePath = "./textures/moon.jpg"
var moonGeometryRadius = 50
var moonGeometryWidthSegments = 64
var moonGeometryHeightSegments = 64
var moonPhi = -Math.PI / 2
var moonOrbitRadius = 200

function init() {
    prepare()

    initRender()
    initCamera()
    initScene()
    initControls()

    //Добавить фоновый свет ambient
    //При зуме сцены не зумить skybox
    
    const sunMeshRequst = new PlanetMeshRequest(
      sunTexturePath,
      sunGeometryRadius,
      sunGeometryWidthSegments,
      sunGeometryHeightSegments,
      sunPhi,
      sunOrbitRadius)
    const sunMeshBuilder = new SunMeshBuilder(sunMeshRequst)
    sunMesh = sunMeshBuilder.build()

    const moonMeshRequest = new PlanetMeshRequest(moonTexturePath, moonGeometryRadius, moonGeometryWidthSegments, moonGeometryHeightSegments, moonPhi, moonOrbitRadius)
    const moonMeshBuilder = new MoonMeshBuilder(moonMeshRequest)
    moonMesh = moonMeshBuilder.build()
    moonMesh.castShadow = true

    const earthMeshRequest = new PlanetMeshRequest(
      earthTexturePath,
      earthGeometryRadius,
      earthGeometryWidthSegments,
      earthGeometryHeightSegments,
      earthPhi,
      earthOrbitRadius)
    const earthMeshBuilder = new EarthMeshBuilder(earthMeshRequest)
    earthMesh = earthMeshBuilder.build()
    earthMesh.castShadow = true

    moonBase.add(moonMesh)
    earthBase.add(earthMesh)
    sunBase.add(sunMesh)

    scene.add(sunBase)
    sunBase.add(earthBase)
    earthBase.add(moonBase)
    
    const sunLight = new THREE.PointLight( 0xffffff, 6, 4000);
    sunLight.position.set( 0,0,0 );
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    scene.add(sunLight)

    earthBase.position.set(earthOrbitRadius, 0, 0)
    moonBase.position.set(moonOrbitRadius, 0, 0) 

    const skyBase = new THREE.Object3D()
    const skyGeometry = new THREE.BoxGeometry(5000, 5000, 5000)
    const skyMaterial = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('./textures/sky.jpg'), side: THREE.BackSide } )
    const skyMesh = new THREE.Mesh(skyGeometry, skyMaterial)
    skyBase.add(skyMesh)
    skyBase.add(sunBase)
    scene.add(skyBase)

    loop()
}

function loop() {
  renderer.render(scene, camera)

  earthBase.position.x = earthOrbitRadius * Math.cos(earthPhi)
  earthBase.position.z = earthOrbitRadius * Math.sin(earthPhi)
  earthBase.rotation.z = 23.43 * Math.PI / 180
  earthBase.rotation.y += 0.001
  earthPhi += 0.008

  moonBase.position.x = moonOrbitRadius * Math.cos(moonPhi)
  moonBase.position.z = moonOrbitRadius * Math.sin(moonPhi)
  moonBase.rotation.y += 0.002
  moonPhi += 0.02

  sunBase.rotation.y += 0.001

  controls.update()
  requestAnimationFrame(function () {
    loop()
  })
}

function prepare() {
  width = window.innerWidth
  height = window.innerHeight
  container = document.getElementById("container")
}

function initScene() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000)
}

function initRender() {
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    5000
  )
  camera.position.z = 3000
  camera.lookAt(0,0,0)
}

function initControls() {
  controls = new OrbitControls(camera, renderer.domElement)
  // controls.minPolarAngle = Math.PI / 2
  // controls.maxPolarAngle = Math.PI / 2
  controls.enableZoom = true
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)

  renderer.render(scene, camera)
}

window.onload = function () {
  init()
  window.onresize = onWindowResize
}
