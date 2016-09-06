var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var interval = 10;

var objArray = [];
var paused = false;

document.addEventListener("keydown", keyDownHandler);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function keyDownHandler(event) {
    if (event.keyCode == 67) {  // c
        objArray[objArray.length] = new Ball(randomX(), randomY(), randomRadius());
    }
    else if (event.keyCode == 80) { // p
        paused = !paused;
    }
    else if (event.keyCode == 40) { // down arrow
        fps -= 10;
    }
    else if (event.keyCode == 38) { // up arrow
        fps += 10;
    }
}

function canvasBackground() {
    canvas.style.backgroundColor = "skyblue";
}

function collisionDetection() {
    for (var obj in objArray) {
        if (objArray[obj].x - objArray[obj].radius + objArray[obj].dx < 0 ||
            objArray[obj].x + objArray[obj].radius + objArray[obj].dx > canvas.width) {
            objArray[obj].dx *= -1;
        }
        if (objArray[obj].y - objArray[obj].radius + objArray[obj].dy < 0 ||
            objArray[obj].y + objArray[obj].radius + objArray[obj].dy > canvas.height) {
            objArray[obj].dy *= -1;
        }
    }
}

function moveObjects() {
    if (!paused) {
        for (var obj in objArray) {
            objArray[obj].x += objArray[obj].dx;
            objArray[obj].y += objArray[obj].dy;
        }
    }
}

function drawObjects() {
    for (var obj in objArray) {
        objArray[obj].draw();
    }
}

function draw() {
    clearCanvas();
    canvasBackground();
    collisionDetection();
    moveObjects();
    drawObjects();
    logShit();
}

setInterval(draw, interval);

function logShit() {    
}
