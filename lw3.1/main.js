var canvas
var ctx

var width
var height

const gridStep = 1
const scale = 20
const hatchSize = 8
const hatchTextOffsetX = 2
const hatchTextOffsetY = 1

const y = (x) => 2 * (x**2) - 3 * x - 8 

window.onload = function() {
    width = window.innerWidth
    height = window.innerHeight

    canvas = document.getElementById('canvas')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)

    ctx = canvas.getContext('2d')
    ctx.lineWidth = 0.5
    drawGrid()

    ctx.lineWidth = 2.5
    drawAxiosX()
    drawAxiosY()
    drawParabola()
}

function drawParabola() {
    let pts = [];

    for(let x = -2; x <= 3; x += 0.1) {
        const yValue = height/2 - y(x) * scale 
        pts.push([ width/2 + x * scale, yValue]);
    }

    draw('blue', pts)
}

function drawAxiosX() {
    draw('red', [[0, (height / 2)], [width, (height / 2)]])

    let hatchCounter = 0
    for (let i = width / 2; i > 0; i -= gridStep*scale) {
        hatchCounter--
        draw('red', [[i - gridStep * scale, (height/2) - hatchSize], [i - gridStep * scale, (height/2) + hatchSize ]]);
        drawHatchText(hatchCounter, i - gridStep * scale, (height/2) - hatchSize * hatchTextOffsetY)
    }

    hatchCounter = 0
    for (let i = width / 2; i < width; i += gridStep*scale) {
        hatchCounter++
        draw('red', [[ i - gridStep * scale, (height/2) - hatchSize], [i - gridStep * scale, (height/2) + hatchSize ]]);
        drawHatchText(hatchCounter, i + gridStep * scale, (height/2) - hatchSize * hatchTextOffsetY)
    }
}

function drawAxiosY() {
    draw('red', [[width / 2, 0], [width / 2, height]])

    let hatchCounter = 0
    for (let i = height / 2; i >= 0; i -= gridStep*scale) {
        hatchCounter++
        draw('red', [[(width/2) - hatchSize, i - gridStep * scale], [(width/2) + hatchSize,i - gridStep * scale ]]);
        drawHatchText(hatchCounter, (width/2) - hatchSize * hatchTextOffsetX, i - gridStep * scale)
    }

    hatchCounter = 0
    for (let i = height / 2; i < height; i += gridStep*scale) {
        hatchCounter--
        draw('red', [[(width/2) - hatchSize, i - gridStep * scale], [(width/2) + hatchSize,i - gridStep * scale ]]);
        drawHatchText(hatchCounter, (width/2) - hatchSize * hatchTextOffsetX, i + gridStep * scale + 5)
    }
}

function drawGrid() {
    for (let i = width / 2; i > 0; i -= gridStep*scale) {
        draw('#7a7979', [[i - gridStep * scale, height], [i - gridStep * scale, 0]]);
    }

    for (let i = width / 2; i < width; i += gridStep*scale) {
        draw('#7a7979', [[ i - gridStep * scale, height], [i - gridStep * scale, 0 ]]);
    }

    for (let i = height / 2; i > 0; i -= gridStep*scale) {
        draw('#7a7979', [[0, i - gridStep * scale], [width,i - gridStep * scale ]]);
    }

    for (let i = height / 2; i < height; i += gridStep*scale) {
        draw('#7a7979', [[0, i - gridStep * scale], [width,i - gridStep * scale ]]);
    }
}

function drawHatchText(text, x, y) {
    ctx.font = '13px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'center'
    ctx.fillText(text, x, y)
}

function draw(color, points) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    points.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p));
    ctx.stroke();
}