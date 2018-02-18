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
    if (bigBalls) {
        r = Math.ceil(Math.random() * 10 + 13);
        return r;
    } else {
        r = Math.ceil(Math.random() * 2 + 1);
        //r = 2;
        return r;
    }
}

function randomDx() {
    r = Math.floor(Math.random() * 10 - 5);
    return r;
}

function randomDy() {
    r = Math.floor(Math.random() * 10 - 5);
    return r;
}

function distanceNextFrame(a, b) {
    return Math.sqrt((a.x + a.dx - b.x - b.dx)**2 + (a.y + a.dy - b.y - b.dy)**2) - a.radius - b.radius;
}

function distance(a, b) {
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
}