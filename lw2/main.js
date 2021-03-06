var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var input = document.getElementById('imgSource')
var img = document.getElementById('imgHidden')
var colorPanel = document.getElementById('colorPanel')
var brushSizePanel = document.getElementById('brushSizePanel')
var saveButton = document.getElementById('saveButton')
var menu = document.getElementById('menu')
var menuBtn = document.getElementById('menuBtn')
var openBtn = document.getElementById('openBtn')
var newCanvasBtn = document.getElementById('newCanvasBtn')
var wrapper = document.getElementById('wrapper')
var navigation = document.getElementById('navigation')
var storeCanvas

var isDraw = false

var mouse = { x: 0, y: 0 }

function main() {
    canvas.width = wrapper.offsetWidth - 4
    canvas.height = wrapper.offsetHeight - navigation.offsetHeight - 4
    ctx.lineJoin = ctx.lineCap = 'round';

    input.addEventListener('change', loadImage, false)
    colorPanel.addEventListener('change', changeColor, false)
    brushSizePanel.addEventListener('input', changeBrushSize, false)
    saveButton.addEventListener('click', saveImage, false)
    menuBtn.addEventListener('mouseover', showMenu, false)
    menu.addEventListener('mouseleave', hideMenu, false)
    openBtn.addEventListener('click', (e) => { input.click() }, false)
    newCanvasBtn.addEventListener('click', clearCanvas, false)

    window.onresize = function(e) {
        canvas.width = wrapper.offsetWidth - 4
        canvas.height = wrapper.offsetHeight - navigation.offsetHeight - 4
        //img.src = canvas.toDataURL("image/png")
        draw()
        // if (storeCanvas) {
        //     ctx.putImageData(storeCanvas, 0, 0)
        // }  
    }

    initDrawMode()
    initBrushSizePanel()
}

function clearCanvas(e) {
    ctx.clearRect(0,0, canvas.width, canvas.height)
}

function showMenu(e) {
    if (menu.hasAttribute('style')) {
        return
    }
    else {
        menu.setAttribute('style', 'display: flex;')
    }
}

function hideMenu(e) {
    menu.removeAttribute('style')
}

function saveImage(e) {
    var canvasImage = new Image()
    canvasImage.src = canvas.toDataURL()

    var link = document.createElement('a')
    link.setAttribute('href', canvasImage.src)
    link.setAttribute('download', 'canvasImage')

    link.click()
}


function initBrushSizePanel() {
    for ( let size = 2; size <= 60; size += 2 )
    {
        brushSizePanel.innerHTML += `<option value="${size}" ${ size === 2 ? 'selected' : '' }>${size}</option>`        
    }
}

function changeBrushSize(e) {
    ctx.lineWidth  = parseInt(e.target.value)
}

function changeColor(e) {
    ctx.strokeStyle = e.target.value
}

function initDrawMode() {
    canvas.addEventListener('mousedown', function(e) {
        mouse.x = e.pageX - this.offsetLeft
        mouse.y = e.pageY - this.offsetTop
        isDraw = true
        ctx.beginPath()
        ctx.moveTo(mouse.x, mouse.y)
    })

    canvas.addEventListener('mousemove', function(e) {
        if (!isDraw) return 

        mouse.x = e.pageX - this.offsetLeft
        mouse.y = e.pageY - this.offsetTop
        ctx.lineTo(mouse.x, mouse.y)
        ctx.stroke()
    })

    canvas.addEventListener('mouseup', function(e) {
        mouse.x = e.pageX - this.offsetLeft
        mouse.y = e.pageY - this.offsetTop
        ctx.lineTo(mouse.x, mouse.y)
        ctx.stroke()

        ctx.closePath()
        isDraw = false

        storeCanvas = ctx.getImageData(0,0,canvas.width,canvas.height)
    })
}

function draw() {
    if (!img.src) {
        return
    }

    ctx.clearRect(0,0,canvas.clientWidth, canvas.clientHeight)

    let scale = -(resolveImageScale(img.width, img.height))

    const ratio = (10 + scale) / 10;

    const scaledImageWidth = img.width * ratio;
    const scaledImageHeight = img.height * ratio;

    const startX = (canvas.clientWidth - scaledImageWidth) / 2;
    const startY = (canvas.clientHeight - scaledImageHeight) / 2;

    ctx.drawImage(img, 0, 0, img.width, img.height, startX, startY, scaledImageWidth, scaledImageHeight)
}

function loadImage(e) {
    const reader = new FileReader()
    const file = e.target.files[0]
    reader.onload = (e) => {
        img.setAttribute('src', e.target.result)
        window.requestAnimationFrame(draw)
    }

    reader.readAsDataURL(file)
}

function resolveImageScale(imgWidth, imgHeight) {
    let subWidth = imgWidth - canvas.width
    let subHeight = imgHeight - canvas.height

    if (subWidth < 200 || subHeight < 200) {
        return 3.5
    }
    else if (subWidth >= 200 && subWidth < 400 || subHeight >= 200 && subHeight < 400)
    {
        return 5
    }
    else if (subWidth >= 400 && subWidth < 1000 || subHeight >= 400 && subHeight < 1000)
    {
        return 6
    }
    else if (subWidth >= 1000 || subHeight >= 1000)
    {
        return 7
    }
    else 
    {
        return 1   
    }
}

main()







