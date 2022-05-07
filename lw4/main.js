import * as THREE from "https://cdn.skypack.dev/three"
import Orbit from "https://cdn.skypack.dev/three-orbit-controls"
import { GeometryDecorator } from "./geometry-decorator.js"

var OrbitControls = new Orbit(THREE)
var width
var height
var container
var camera
var scene
var renderer
var controls

function init() {
  prepare()

  initRender()
  initCamera()
  initScene()
  initControls()

  const light = new THREE.AmbientLight(0xffffff)
  scene.add(light)

  const geometry = new GeometryDecorator( 200 ).paintFaces()
  
  const {material, wireframeMaterial} = createMaterials()
  const mesh = new THREE.Mesh(geometry, material)
  const wireframe = new THREE.Mesh(geometry, wireframeMaterial)
  mesh.add(wireframe)
  scene.add(mesh)

  loop()
}

function loop() {
    renderer.render(scene, camera)
    controls.update()
    requestAnimationFrame(function () {
      loop()
    })
}

function createMaterials() {
    const material = new THREE.MeshPhongMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
        opacity: 0.6,
        transparent: true,
      })
    
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
    })    

    return {
        material, wireframeMaterial
    }
}

function prepare() {
    width = window.innerWidth
    height = window.innerHeight
    container = document.getElementById("container")
}

function initScene() {
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
}

function initRender() {   
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.z = 1500
}

function initControls() {
    controls = new OrbitControls(camera, renderer.domElement)
    controls.minPolarAngle = Math.PI / 2
    controls.maxPolarAngle = Math.PI / 2
    controls.enableZoom = false
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