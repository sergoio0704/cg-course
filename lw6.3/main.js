import * as THREE from '../three/build/three.module.js'
import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js'

var controls
var width
var height
var container
var camera
var scene
var renderer
var line
var time = 0

function init() {
    prepare()

    initRender()
    initCamera()
    initScene()
    initControls()

    const light = new THREE.AmbientLight(0xffffff)
    scene.add(light)

    const points = createVerticesTorus(128, 96)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    const shaderMaterial = new THREE.ShaderMaterial( {
      uniforms: { u_time: { value: time } },
      vertexShader: document.getElementById( 'vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
      wireframe: true
    });

    line = new THREE.LineSegments( geometry, shaderMaterial );

    scene.add( line );

    loop()
}

function createVerticesSphere(minX, maxX) {
  let points = []
  let step  = Math.PI / ( 180 * maxX )
  for ( let i = minX; i <= maxX; i += step) {
    const phiAngle = i
    const deltaAngle = getRandomIntInclusive(0, 10) / 10 * Math.PI
    points.push(new THREE.Vector3(phiAngle, deltaAngle, 1 ))
  }

  return points
}

function createVerticesTorus(radialSegments = 128, tubularSegments = 96) {
  let points = []
  let arc = Math.PI * 2
  for ( let j = 0; j <= radialSegments; j ++ ) {
    for ( let i = 0; i <= tubularSegments; i ++ ) {
        const u = i / tubularSegments * arc;
				const v = j / radialSegments * Math.PI * 2;

        points.push(new THREE.Vector3(u, v, 1 ))
    }
  }

  return points
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function loop() {
  renderer.render(scene, camera)
  time += 0.003
  if (time >= 6.0) {
    time = 0
  }

  line.material.uniforms.u_time.value = time

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
  camera.position.z = 1
  camera.position.y = -10
  camera.position.x = 0
}

function initControls() {
  controls = new OrbitControls(camera, renderer.domElement)
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
