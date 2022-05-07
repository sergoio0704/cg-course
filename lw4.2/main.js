import * as THREE from './three/build/three.module.js'
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js'
import { GeometryDecorator } from "./geometry-decorator.js"

var controls
var width
var height
var container
var camera
var scene
var renderer

function init() {
    prepare()

    initRender()
    initCamera()
    initScene()
    initControls()

    const light = new THREE.AmbientLight(0xffffff)
    scene.add(light)

    const geometry = new GeometryDecorator((u, v, target) => {
      u = u * Math.PI * 4;
      v = -v

      const x = (1 + v/2 * Math.cos(u/2)) * Math.cos(u)
      const y = (1 + v/2 * Math.cos(u/2)) * Math.sin(u)
      const z = v/2 * Math.sin(u/2)

      target.set(x,y,z)
      return new THREE.Vector3(x,y,z);
    }, 100, 1).paintFaces()

    geometry.rotateX(-Math.PI * 0.5)
    geometry.center();

    const {material, wireframeMaterial} = createMaterials()
    const mesh = new THREE.Mesh(geometry, wireframeMaterial)
    const wireframe = new THREE.Mesh(geometry, material)
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
    opacity: 1,
    transparent: true,
  })

  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
    wireframe: true
  })

  return {
    material,
    wireframeMaterial,
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
  camera = new THREE.PerspectiveCamera(
    20,
    window.innerWidth / window.innerHeight,
    1,
    10000
  )
  camera.position.z = 10
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
