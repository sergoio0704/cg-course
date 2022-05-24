import * as THREE from '../three/build/three.module.js'
import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js'

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
    //initControls()

    const light = new THREE.AmbientLight(0xffffff)
    scene.add(light)

    const points = createPoints(-10, 10, 0.3)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    const shaderMaterial = new THREE.ShaderMaterial( {
      vertexShader: document.getElementById( 'vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    });

    const line = new THREE.Line( geometry, shaderMaterial );

    scene.add( line );

    loop()
}

function createPoints(minX, maxX, step) {
  let points = []
  for ( let i = minX; i <= maxX; i += step) {
    points.push(new THREE.Vector3(i, 1, 1))
  }

  return points
}

function loop() {
  renderer.render(scene, camera)
  //controls.update()
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
  controls.minPolarAngle = Math.PI / 2
  controls.maxPolarAngle = Math.PI / 2
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
