function randomColor() {
    red = Math.floor(Math.random() * 3) * 127;
    green = Math.floor(Math.random() * 3) * 127;
    blue = Math.floor(Math.random() * 3) * 127;
    rc = "rgb(" + red + ", " + green + ", " + blue + ")";
    return rc;
}

function randomX() {
    x = Math.floor(Math.random() * canvas.width);
    if (x < 30) {
        x = 30;
    } else if (x + 30 > canvas.width) {
        x = canvas.width - 30;
    }
    return x;
}

function randomY() {
    y = Math.floor(Math.random() * canvas.height);
    if (y < 30) {
        y = 30;
    } else if (y + 30 > canvas.height) {
        y = canvas.height - 30;
    }
    return y;
}

function randomRadius() {
    r = Math.ceil(Math.random() * 20 + 10);
    //r = 20;
    return r;
}

function randomDx() {
    r = Math.floor(Math.random() * 20 - 10);
    return r;
}

function randomDy() {
    r = Math.floor(Math.random() * 20 - 10);
    return r;
}

function distanceNextFrame(a, b) {
    return Math.sqrt((a.x + a.dx - b.x - b.dx)**2 + (a.y + a.dy - b.y - b.dy)**2) - a.radius - b.radius;
}