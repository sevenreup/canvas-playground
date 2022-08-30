var ctx;
var currentPosition;
var gridSize;
var direction = 'right';
snakeBody = [];
var snakeLength;
var suggestedPoint;

function init() {
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    var x = 50;
    var y = 50;
    currentPosition = [x, y];
    gridSize = 10;
    snakeLength = 3;
    makeFoodItem();
    setInterval(moveSnake, 100);


    $(document).keydown(function (e) {
        switch (e.keyCode) {
            case 37:
            if(direction != 'left'){
                moveLeft();}
                break;
            case 38:
            if(direction != 'up')
                moveUp();
                break;
            case 39:
            if(direction != 'right')
                moveRight();
                break;
            case 40:
            if(direction != 'down')
                moveDown();
                break;
        }
    });
}

function moveSnake() {
    switch (direction) {
        case 'left':
            moveLeft();
            break;
        case 'up':
            moveUp();
            break;
        case 'down':
            moveDown();
            break;
        case 'right':
            moveRight();
            break;
    }
}

function leftPosition() {
    return currentPosition[0] - gridSize;
}

function rightPosition() {
    return currentPosition[0] + gridSize;
}

function upPosition() {
    return currentPosition[1] - gridSize;
}

function downPosition() {
    return currentPosition[1] + gridSize;
}

function executeMove(dirValue, axisType, axisValue) {
    direction = dirValue;
    currentPosition[axisType] = axisValue;
    drawSnake();
}

function moveUp() {
    if (upPosition() >= 0) {
        executeMove('up', 1, upPosition());
    } else {
        whichWayToGo(0);
    }
}

function moveDown() {
    if (downPosition() < canvas.height) {
        executeMove('down', 1, downPosition());
    } else {
        whichWayToGo(0);
    }
}

function moveLeft() {
    if (leftPosition() >= 0) {
        executeMove('left', 0, leftPosition());
    } else {
        whichWayToGo(1);
    }
}

function moveRight() {
    if (rightPosition() < canvas.width) {
        executeMove('right', 0, rightPosition());
    } else {
        whichWayToGo(1);
    }
}
function whichWayToGo(axisType) {
    if (axisType == 0) {
        a = (currentPosition[0] > canvas.width / 2) ? moveLeft() : moveRight();
    } else {
        a = (currentPosition[1] > canvas.height / 2) ? moveUp() : moveDown();
    }
}
function drawSnake() {
    if (snakeBody.some(hasEatenItself)) {
        gameOver();
        return false;
    }
    snakeBody.push([currentPosition[0], currentPosition[1]]);
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(currentPosition[0], currentPosition[1], gridSize, gridSize);
    if (snakeBody.length > snakeLength) {
        var itemRemove = snakeBody.shift();
        ctx.clearRect(itemRemove[0], itemRemove[1], gridSize, gridSize);
    }
    if (currentPosition[0] == suggestedPoint[0] && currentPosition[1] == suggestedPoint[1]) {
        makeFoodItem();
        snakeLength += 1;
    }
}

function makeFoodItem() {
    suggestedPoint = [Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize];
    if (snakeBody.some(hasPoint)) {
        makeFoodItem();
    } else {
        ctx.fillStyle = "rgb(10,100,0)";
        ctx.fillRect(suggestedPoint[0], suggestedPoint[1], gridSize, gridSize);
    };
}

function hasPoint(element, index, array) {
    return (element[0] == suggestedPoint[0] && element[1] == suggestedPoint[1]);
}

function hasEatenItself(element, index, array) {
    return (element[0] == currentPosition[0] && element[1] == currentPosition[1]);
}
function gameOver() {
    var score = (snakeLength - 3) * 10;
    clearInterval(interval);
    snakeBody = [];
    snakeLength = 3;
    allowPressKeys = false;
    alert("Game Over. Your score was " + score);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
init();

