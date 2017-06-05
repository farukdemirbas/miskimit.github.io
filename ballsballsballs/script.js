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

var beep = new Audio('beep');
beep.volume = 0.015

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
            objArray[obj].dx -= 0.2;
        }
    } if (upHeld) { // up arrow
        for (var obj in objArray) {
            objArray[obj].dy -= 0.2;
        }
    } if (rightHeld) { // right arrow
        for (var obj in objArray) {
            objArray[obj].dx += 0.2;
        }
    } if (downHeld) { // down arrow
        for (var obj in objArray) {
            objArray[obj].dy += 0.2;
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
            if (obj1 !== obj2 && distanceNextFrame(objArray[obj1], objArray[obj2]) <= 0) {

                theta1 = objArray[obj1].angle();
                theta2 = objArray[obj2].angle();
                phi = Math.atan2(objArray[obj2].y - objArray[obj1].y, objArray[obj2].x - objArray[obj1].x);
                m1 = objArray[obj1].mass;
                m2 = objArray[obj2].mass;
                v1 = objArray[obj1].speed();
                v2 = objArray[obj2].speed();

                dx1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.cos(phi) + v1*Math.sin(theta1-phi) * Math.cos(phi+Math.PI/2);
                dy1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.sin(phi) + v1*Math.sin(theta1-phi) * Math.sin(phi+Math.PI/2);
                dx2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.cos(phi) + v2*Math.sin(theta2-phi) * Math.cos(phi+Math.PI/2);
                dy2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.sin(phi) + v2*Math.sin(theta2-phi) * Math.sin(phi+Math.PI/2);

                objArray[obj1].dx = dx1F;                
                objArray[obj1].dy = dy1F;                
                objArray[obj2].dx = dx2F;                
                objArray[obj2].dy = dy2F;
                
                beep.play()
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

objArray[objArray.length] = new Ball(randomX(), randomY(), randomRadius());
objArray[objArray.length] = new Ball(randomX(), randomY(), randomRadius());
objArray[objArray.length] = new Ball(randomX(), randomY(), randomRadius());

draw();

function logShit() {
    for (var obj in objArray) {
        totalKineticEnergy += objArray[obj].kineticEnergy();
    }
    console.log("kinetic energy:", totalKineticEnergy.toLocaleString());
    totalKineticEnergy = 0;
}
