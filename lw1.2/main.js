var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

canvas.width = document.body.clientWidth + document.scrollingElement.scrollLeft
canvas.height = document.documentElement.clientHeight

function main() {
    ctx.fillRect(0,0, document.body.clientWidth, document.body.clientHeight)
    drawBackground()
    drawPipe() 
    drawFence()
    drawWall()
    drawRoof()
    drawWindow()
    drawDoor()
}

function drawWall() {
    ctx.fillStyle = "#693905"
    ctx.strokeStyle = "#000"
    ctx.beginPath();
    ctx.lineWidth = 3
    ctx.rect(550,210,400,410)
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function drawRoof() {
    ctx.fillStyle = "#ab0505"
    ctx.strokeStyle = "#000"
    ctx.beginPath();
    ctx.lineWidth = 3
    ctx.moveTo(510, 210)
    ctx.lineTo(750, 10)
    ctx.lineTo(990, 210)
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function drawWindow() {
    ctx.fillStyle = "#e6f0c5"
    ctx.strokeStyle = "#000"
    ctx.beginPath()
    ctx.rect(800, 250, 50, 50)
    ctx.rect(851, 250, 50, 50)
    ctx.rect(800, 301, 50, 50)
    ctx.rect(851, 301, 50, 50)
    ctx.closePath()
    ctx.lineWidth = 2
    ctx.stroke();
    ctx.fill();
}

function drawDoor() {
    ctx.fillStyle = "#494e4f"
    ctx.strokeStyle = "#000"
    ctx.beginPath()
    ctx.rect(600, 450, 100, 150)
    ctx.closePath()
    ctx.lineWidth = 2
    ctx.stroke();
    ctx.fill();

    ctx.beginPath()
    ctx.fillStyle = "#000"
    ctx.lineWidth = 1
    ctx.arc(680, 530, 5, 0, 2*Math.PI, false);
    ctx.stroke()
    ctx.fill();
    ctx.closePath()
}

function drawFence() {
    ctx.fillStyle = "#d48919"
    ctx.strokeStyle = "#000"
    ctx.beginPath()
    ctx.rect(0, 480, document.body.clientWidth, 6)
    ctx.rect(0, 550, document.body.clientWidth, 6)
    for ( let i = 4; i <= document.body.clientWidth; i += 10)
    {
        if ( i % 10 == 0 ) { continue }
        ctx.rect(i, 420, 4, 200)
    }

    ctx.closePath()
    ctx.lineWidth = 2
    ctx.stroke();
    ctx.fill();
}

function drawPipe() {
    ctx.fillStyle = "#3b3431"
    ctx.strokeStyle = "#000"
    ctx.beginPath()
    ctx.rect(850, 30, 20, 80)
    ctx.closePath()
    ctx.lineWidth = 2
    ctx.stroke();
    ctx.fill();
}

function drawBackground() {
    ctx.fillStyle = "#3dd944"
    ctx.fillRect(0, 500, document.body.clientWidth, 300)

    ctx.beginPath()
    ctx.fillStyle = "#9ed2f0"
    ctx.fillRect(0, 0, document.body.clientWidth, 600)
    ctx.closePath()
}

main()







