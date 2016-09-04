function Ball(x, y, radius) {
  this.x = x;
  this.y = y;
  this.dx = randomDx();
  this.dy = randomDy();
  this.radius = radius;
  this.color = randomColor();
  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };
}

function randomColor() {
  red = Math.floor(Math.random() * 3) * 127;
  green = Math.floor(Math.random() * 3) * 127;
  blue = Math.floor(Math.random() * 3) * 127;
  rc = "rgb(" + red + ", " + green + ", " + blue + ")";
  return rc;
}

function randomX() {
  x = Math.floor(Math.random()*canvas.width);
  if (x < 30) {
    x = 30;
  }
  else if (x + 30 > canvas.width) {
    x = canvas.width - 30;
  }
  return x;
}
function randomY() {
  y = Math.floor(Math.random()*canvas.height);
  if (y < 30) {
    y = 30;
  }
  else if (y + 30 > canvas.height) {
    y = canvas.height - 30;
  }
  return y;
}
function randomRadius() {
  r = Math.floor(Math.random()*20 + 10);
  return r;
}

function randomDx() {
  r = Math.floor(Math.random()*20 - 10);
  return r;
}

function randomDy() {
  r = Math.floor(Math.random()*20 - 10);
  return r;
}
