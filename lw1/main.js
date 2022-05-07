import Component from "./models/component.js"
import MoveableShape from "./models/moveableDecorator.js";
import Painter from "./models/painter.js"
import Rectangle from "./models/rectange.js"

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var painter = null
var moveableLiterals = [];

function main() {
    painter = new Painter(ctx)
    moveableLiterals = buildMoveableLiterals()
    window.requestAnimationFrame(execute)
}

function execute() {
    if (moveableLiterals.length === 0) {
        console.log('Literals is empty')
        return 
    }

    
    clearCanvas()
    for (let moveableLiteral of moveableLiterals) {
        moveableLiteral.getShape().updateColor()
        ctx.fillStyle = moveableLiteral.getShape().getColor()
        painter.draw(moveableLiteral.getShape())
        moveableLiteral.move()
       
    }

    window.requestAnimationFrame(execute)
}

function clearCanvas() {
    ctx.clearRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight)
}

function buildMoveableLiterals() {
    const firstNameLiteral = new Component([
            new Rectangle(10, 10, 10, 70), 
            new Rectangle(20, 10, 30, 10), 
            new Rectangle(50, 10, 10, 70)
    ])
    const secondNameLiteral = new Component([
            new Rectangle(70, 10, 10, 70), 
            new Rectangle(80, 10, 30, 10),
            new Rectangle(100, 20, 10, 10),
            new Rectangle(80, 70, 30 , 10),
            new Rectangle(100, 60, 10, 10) 
    ])

    const patronymicLiteral = new Component([
            new Rectangle(120, 10, 10, 70), 
            new Rectangle(130, 10, 30, 10), 
            new Rectangle(160, 10, 10, 70)
    ])

    return [
        new MoveableShape(firstNameLiteral, 0.1),
        new MoveableShape(secondNameLiteral, 0.2),
        new MoveableShape(patronymicLiteral, 0.3),
    ]
}

main()






