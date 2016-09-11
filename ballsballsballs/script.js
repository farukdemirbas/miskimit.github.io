var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var objArray = [];
var paused = false;
var totalKineticEnergy = 0;
var bumped = false;

var leftHeld = false;
var upHeld = false;
var rightHeld = false;
var downHeld = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function keyDownHandler(event) {
    if (event.keyCode == 67) { // c
        objArray[objArray.length] = new Ball(randomX(), randomY(), randomRadius());
        console.log("sheep:", objArray.length);
    } else if (event.keyCode == 80) { // p
        paused = !paused;
    } else if (event.keyCode == 37) { // left arrow
        leftHeld = true;
    } else if (event.keyCode == 38) { // up arrow
        upHeld = true;
    } else if (event.keyCode == 39) { // right arrow
        rightHeld = true;
    } else if (event.keyCode == 40) { // down arrow
        downHeld = true;
    } else if (event.keyCode == 82) { // r
        objArray = [];
        console.log("sheep:", objArray.length);
    }
}


function keyUpHandler(event) {
    if (event.keyCode == 37) { // left arrow
        leftHeld = false;
    } else if (event.keyCode == 38) { // up arrow
        upHeld = false;
    } else if (event.keyCode == 39) { // right arrow
        rightHeld = false;
    } else if (event.keyCode == 40) { // down arrow
        downHeld = false;
    }
}

function arrowControls() {
    if (leftHeld) { // left arrow
        for (var obj in objArray) {
            objArray[obj].dx -= 0.5;
        }
    } if (upHeld) { // up arrow
        for (var obj in objArray) {
            objArray[obj].dy -= 0.5;
        }
    } if (rightHeld) { // right arrow
        for (var obj in objArray) {
            objArray[obj].dx += 0.5;
        }
    } if (downHeld) { // down arrow
        for (var obj in objArray) {
            objArray[obj].dy += 0.5;
        }
    }
}

function canvasBackground() {
    canvas.style.backgroundColor = "skyblue";
}

function wallCollision() {
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

function ballCollision() {
    //var hasCollided = {};
    for (var obj1 in objArray) {
        for (var obj2 in objArray) {
            if (obj1 !== obj2 /*&& hasCollided[obj2] != obj1*/ && distanceNextFrame(objArray[obj1], objArray[obj2]) <= 0) {

                dx1F = ((objArray[obj1].mass - objArray[obj2].mass) / (objArray[obj1].mass + objArray[obj2].mass)) * objArray[obj1].dx + ((2 * objArray[obj2].mass / (objArray[obj1].mass + objArray[obj2].mass)) * objArray[obj2].dx);

                dy1F = ((objArray[obj1].mass - objArray[obj2].mass) / (objArray[obj1].mass + objArray[obj2].mass)) * objArray[obj1].dy + ((2 * objArray[obj2].mass / (objArray[obj1].mass + objArray[obj2].mass)) * objArray[obj2].dy);

                dx2F = ((2 * objArray[obj1].mass / (objArray[obj1].mass + objArray[obj2].mass)) * objArray[obj1].dx + ((objArray[obj2].mass - objArray[obj1].mass) / (objArray[obj1].mass + objArray[obj2].mass)) * objArray[obj2].dx);

                dy2F = ((2 * objArray[obj1].mass / (objArray[obj1].mass + objArray[obj2].mass)) * objArray[obj1].dy + ((objArray[obj2].mass - objArray[obj1].mass) / (objArray[obj1].mass + objArray[obj2].mass)) * objArray[obj2].dy);


                objArray[obj1].dx = dx1F;                
                objArray[obj1].dy = dy1F;                
                objArray[obj2].dx = dx2F;                
                objArray[obj2].dy = dy2F;

                //hasCollided[obj1] = obj2;

            }

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
    arrowControls();
    moveObjects();
    drawObjects();
    ballCollision();
    wallCollision();
    logShit();
    requestAnimationFrame(draw);
}

//setInterval(draw, 1000/60);
draw();

function logShit() {
    for (var obj in objArray) {
        totalKineticEnergy += objArray[obj].kineticEnergy();
    }
    //console.log("kinetic energy:", Math.round(totalKineticEnergy));
    totalKineticEnergy = 0;
}
