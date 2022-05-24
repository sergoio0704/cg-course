var canvas
var gl
var vertexShader
var fragmentShader
var shaderProgram

function init() {
    canvas = document.getElementById('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gl = canvas.getContext('webgl')
    gl.viewportWidth = window.innerWidth
    gl.viewportHeight = window.innerHeight

    vertexShader = getShader(gl.VERTEX_SHADER, 'vertexShader')
    fragmentShader = getShader(gl.FRAGMENT_SHADER, 'fragmentShader')

    shaderProgram = gl.createProgram()

    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)

    gl.linkProgram(shaderProgram)
    gl.useProgram(shaderProgram)

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vertex_position");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "vertex_color");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

    /*---------------ЗВЕЗДА----------------*/

    ///Создание буффера вершин звезды
    var starVertices = createStarVertices(0.5, Math.PI / 2, 5, 2, 1)
    var starVertexBuffer = createArrayBuffer(starVertices)

    ///Создание буффера цветов тела звезды
    var starBodyColors = [
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
    ];
    var starBodyColorBuffer = createArrayBuffer(starBodyColors)

    ///Создание буффера индексов тела звезды
    var starBodyIndices = [4,6,8, 2,9,7, 1,5,7, 6,9,3, 5,8,0];
    var starBodyIndexBuffer = createElementArrayBuffer(starBodyIndices)

    draw(gl.TRIANGLES, starVertexBuffer, starBodyColorBuffer, starBodyIndexBuffer)

    /*---------------КОНТУР ЗВЕЗДЫ----------------*/

    ///Создание буффера цветов для контура звезды
    var starContourColors = [
      0.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
    ];
    var starContourColorBuffer = createArrayBuffer(starContourColors)

    ///Создание буффера индексов для контура звезды
    var starСontourIndices = [4,5,2,6,0,7,3,8,1,9];
    var starContourIndexBuffer = createElementArrayBuffer(starСontourIndices)

    draw(gl.LINE_LOOP, starVertexBuffer, starContourColorBuffer, starContourIndexBuffer)

    /*---------------ПРЯМОУГОЛЬНИК----------------*/

    ///Создание буффера индексов для прямоугольника
    var rectangleVertices = [
      0.6,  0.6,  0.6,
      -0.6,  0.6,  0.6,
       0.6, -0.6,  0.6,
      -0.6, -0.6,  0.6]
    var rectangleBuffer = createArrayBuffer(rectangleVertices)

    ///Создание буффера индексов для прямоугольника
    var rectangleIndices = [0, 1, 1, 3, 3, 2, 2, 0];
    var rectangleIndexBuffer = createElementArrayBuffer(rectangleIndices)

    ///Создание буффера цветов для прямоугольника
    var rectangleColors = [
      0.0,  0.0,  1.0,
      0.0,  0.0,  1.0, 
      0.0,  0.0,  1.0,
      0.0,  0.0,  1.0,
    ];
    var rectangleColorBuffer = createArrayBuffer(rectangleColors)

    draw(gl.LINES, rectangleBuffer, rectangleColorBuffer, rectangleIndexBuffer)
}

function createArrayBuffer(vertices) {
  var vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
  vertexBuffer.itemSize = 3
  vertexBuffer.numberOfItems = 3

  return vertexBuffer
}

function createElementArrayBuffer(indices) {
  var elementsBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementsBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  elementsBuffer.numberOfItems = indices.length;

  return elementsBuffer
}

function draw(drawMode, vertexBuffer, colorBuffer, indexBuffer) { 
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
                        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 
                        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.drawElements(drawMode, indexBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
}

function getShader(shaderType, shaderId) {
  var shaderSource = document.getElementById(shaderId).innerHTML
  var shader = gl.createShader(shaderType)
  gl.shaderSource(shader, shaderSource)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("Ошибка компиляции шейдера: " + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);   
    return null;
  }

  return shader
}

function createStarVertices(radius, angleBetweenVertex, n, k, step) {
  let points = []
  for ( let i = 1; i <= n; i += step) {
    const x = radius * Math.cos( 2 * Math.PI / n * ( k * i) + angleBetweenVertex )
    const y = radius * Math.sin( 2 * Math.PI / n * ( k * i) + angleBetweenVertex )
    points.push(x/2)
    points.push(y)
    points.push(1)
  }

  angleBetweenVertex = Math.PI / 1.71
  radius = radius / 2.66
  for ( let i = 1; i <= n; i += step) {
    const x = radius * Math.cos( 2 * Math.PI / n * (i) + angleBetweenVertex / 2)
    const y = radius * Math.sin( 2 * Math.PI / n * (i) + angleBetweenVertex / 2)
    points.push(x/2)
    points.push(y)
    points.push(1)
  }

  return points
}

window.onload = function () {
  init()
}
