import config from "./configuration.js"
import gameConfig from "./gameConfiguration.js"
import Gamefield from "./entities/gamefield.js";
import MathHelper from "./helpers/mathHelper.js";

// Canvas
var canvas, context,
    nextFigureCanvas, nextFigureContext,
    infoCanvas, infoContext;

// Tetris entities
var gamefield

//helers
var mathHelper = new MathHelper()

// Tetris properies
var count
var requestId
var currentLevel
var currentScore
var linesLeft
var topScore
var isNeedToUpdateTopScore = false

//Tools
var restartBtn
var continueBtn

window.onload = function() {
    InitCanvas();
    InitProperties();
    InitKeyEvents();
    InitTools();

    gamefield = new Gamefield();

    loop();
}

function loop() {
    requestId = requestAnimationFrame(loop)
    redraw()
}

function redraw() {
    if (gamefield.getIsGameOver()) {
        showGameOver()
    }

    if (currentLevel.fillLines <= linesLeft) {
        const nextLevel = getNextLevel()
        if (!nextLevel) {
            showGameFinish()
        } else {
            linesLeft = linesLeft - currentLevel.fillLines
            currentLevel = nextLevel
        }
    }

    updateInfoPanel()

    context.clearRect(0,0,canvas.width,canvas.height);

    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (gamefield.current[row][col]) {
                const color = gamefield.current[row][col];
                context.fillStyle = color

                context.fillRect(col * config.grid, row * config.grid, config.grid-1, config.grid-1);
            }
        }
    }

    //скорость игры не должна звисеть от скорости комп.
    const tetromino = gamefield.getCurrentTetramino()
    if (tetromino) {
        if (++count > currentLevel.speed) {
            tetromino.row++;
            count = 0;

            if (!canMove(tetromino.matrix, tetromino.row, tetromino.col)) {
                tetromino.row--;
                const fillLinesCount = gamefield.placeTetraminoOnGamefield(showGameOver);
                linesLeft += fillLinesCount
                currentScore += calculateScore(fillLinesCount)
                if (currentScore >= topScore) {
                    isNeedToUpdateTopScore = true
                }

                if (isNeedToUpdateTopScore) {
                    topScore = currentScore
                }
            }
        }

        context.fillStyle = tetromino.color

        for (let row = 0; row < tetromino.matrix.length; row++) {
            for (let col = 0; col < tetromino.matrix[row].length; col++) {
                if (tetromino.matrix[row][col]) {
                    context.fillRect((tetromino.col + col) * config.grid, (tetromino.row + row) * config.grid, config.grid-1, config.grid-1);
                }
            }
        }
    }

    nextFigureContext.clearRect(0,0,nextFigureCanvas.width,nextFigureCanvas .height);
    nextFigureContext.fillStyle = 'black'
    nextFigureContext.fillText('Next Tetromino:', 20, 20)
    const nextTetramino = gamefield.getNextTetramino()
    if (nextTetramino) {
        nextFigureContext.fillStyle = nextTetramino.color

        for (let row = 0; row < nextTetramino.matrix.length; row++) {
            for (let col = 0; col < nextTetramino.matrix[row].length; col++) {
                if (nextTetramino.matrix[row][col]) {
                    const x = (nextFigureCanvas.width / config.grid) / 2 - Math.ceil(nextTetramino.matrix[0].length / 2)
                    nextFigureContext.fillRect((x + col) * config.grid, (row) * config.grid + 35, config.grid-1, config.grid-1);
                }
            }
        }
    }
}

function canMove(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] && (
            cellCol + col < 0 ||
            cellCol + col >= gamefield.current[0].length ||
            cellRow + row >= gamefield.current.length ||
            gamefield.current[cellRow + row][cellCol + col])
          ) {
          return false;
        }
      }
    }
  
    return true;
}

function InitKeyEvents() {
    document.addEventListener('keydown', function(e) {
        if (gamefield.getIsGameOver()) {
            return;
        }

        if (e.code === config.keyCodes.pause) {
            return showPause()
        }

        const tetromino = gamefield.getCurrentTetramino()

        if (e.code === config.keyCodes.left) {
            const newCol = tetromino.col - 1
            if (canMove(tetromino.matrix, tetromino.row, newCol)) {
                tetromino.setCol(newCol)
            }
        }

        if (e.code === config.keyCodes.right) {
            const newCol = tetromino.col + 1
            if (canMove(tetromino.matrix, tetromino.row, newCol)) {
                tetromino.setCol(newCol)
            }
        }

        if (e.code === config.keyCodes.up) {
            const rotatedMatrix = mathHelper.rotateMatrix(tetromino.matrix)
            if (canMove(rotatedMatrix, tetromino.row, tetromino.col)) {
                tetromino.setMatrix(rotatedMatrix)
            }
        }

        if (e.code === config.keyCodes.down) {
            const newRow = tetromino.row + 1;

            if (!canMove(tetromino.matrix, newRow, tetromino.col)) {
                tetromino.setRow(newRow - 1);

                const fillLinesCount = gamefield.placeTetraminoOnGamefield(showGameOver);
                linesLeft += fillLinesCount;
                currentScore += calculateScore(fillLinesCount)
                if (currentScore >= topScore) {
                    isNeedToUpdateTopScore = true
                }

                if (isNeedToUpdateTopScore) {
                    topScore = currentScore
                }
                return;
            }

            tetromino.setRow(newRow);
        }
    })
}

function updateInfoPanel() {
    infoContext.clearRect(0,0,infoCanvas.width,infoCanvas .height);
    infoContext.fillStyle = 'black'
    infoContext.fillText(`LEVEL - ${currentLevel.name}:`, 5, 20)
    infoContext.fillText(`Линий до след. уровня - ${currentLevel.fillLines - linesLeft}`, 5, 40)
    infoContext.fillText(`Очки - ${currentScore}`, 5, 60)
    infoContext.fillText(`Топ результат - ${!topScore ? 0 :topScore}`, 5, 80)
}

function getNextLevel() {
    if (currentLevel.name === '0') {
        return gameConfig.levels.first
    }

    if (currentLevel.name === '1') {
        return gameConfig.levels.second
    }

    if (currentLevel.name === '2') {
        return gameConfig.levels.third
    }

    if (currentLevel.name === '3') {
        return null
    }
}

function calculateScore(fillLinesCount) {
    switch(fillLinesCount) {
        case 0:
            return 0;
        case 1:
            return gameConfig.oneLineScore
        case 2:
            return gameConfig.twoLineScore
        case 3: 
            return gameConfig.threeLineScore
        case 4:
            return gameConfig.fourLineScore
        default:
            return gameConfig.fourLineScore + (fillLinesCount - 4) * gameConfig.oneLineScore
    }
}

function showPause() {
    cancelAnimationFrame(requestId)
    context.fillStyle = 'black'
    context.globalAlpha = 0.7
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = "26px Verdana";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Игра приостановлена', canvas.width / 2, canvas.height / 2);

    continueBtn.style.display = 'block'
}

function showGameFinish() {
    cancelAnimationFrame(requestId)

    saveTopScore();

    context.fillStyle = 'black'
    context.globalAlpha = 0.7
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = "30px Verdana";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Игра пройдена!', canvas.width / 2, canvas.height / 2);
    context.fillText(`Ваш результат: ${currentScore}`, canvas.width / 2, canvas.height / 2 + 50);

    restartBtn.style.display = 'block'
}

function showGameOver() {
    cancelAnimationFrame(requestId)
    
    saveTopScore();

    context.fillStyle = 'black'
    context.globalAlpha = 0.7
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = "30px Verdana";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Игра завершена!', canvas.width / 2, canvas.height / 2);

    restartBtn.style.display = 'block'
}

function saveTopScore() {
    if (isNeedToUpdateTopScore) {
        localStorage.setItem('topScore', currentScore)
    }
}

function InitCanvas() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    nextFigureCanvas = document.getElementById('nextFigureCanvas');
    nextFigureContext = nextFigureCanvas.getContext('2d');
    nextFigureContext.font = "16px Verdana";

    infoCanvas = document.getElementById('infoCanvas');
    infoContext = infoCanvas.getContext('2d');
    infoContext.font = "12px Verdana";
}

function InitProperties() {
    count = 0
    requestId = null
    currentLevel = gameConfig.levels.zero
    currentScore = 0
    linesLeft = 0
    topScore = localStorage.getItem('topScore')
    if (!topScore) {
        isNeedToUpdateTopScore = true
        topScore = 0
    } else {
        topScore = parseInt(topScore)
    }
}

function InitTools() {
    restartBtn = document.getElementById('restart')
    restartBtn.addEventListener('click', function() {
        location.reload()
    })

    continueBtn = document.getElementById('continue')
    continueBtn.addEventListener('click', function() {
        loop()
        continueBtn.style.display = 'none'
    })
}