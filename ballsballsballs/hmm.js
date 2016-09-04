var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var objArray = [];

document.addEventListener("keydown", keyDownHandler);

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function keyDownHandler(event) {
  if (event.keyCode == 32) {
    objArray[objArray.length] = new Ball(randomX(), randomY(), randomRadius());
  }
}

function canvasBackground() {
  canvas.style.backgroundColor = "skyblue";
}

function collisionDetection() {
  for (var obj in objArray) {
    if (objArray[obj].x - objArray[obj].radius < 0 ||
      objArray[obj].x + objArray[obj].radius > canvas.width) {
        objArray[obj].dx *= -1;
      }
      if (objArray[obj].y - objArray[obj].radius < 0 ||
        objArray[obj].y + objArray[obj].radius > canvas.height) {
          objArray[obj].dy *= -1;
        }
      }
    }

    function moveObjects() {
      for (var obj in objArray) {
        objArray[obj].x += objArray[obj].dx;
        objArray[obj].y += objArray[obj].dy;
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
    }

    setInterval(draw, 10);
