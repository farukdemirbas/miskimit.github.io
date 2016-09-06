function Ball(x, y, radius) {
    this.x = x;
    this.y = y;
    this.dx = randomDx();
    this.dy = randomDy();
    this.radius = radius;
    this.color = randomColor();
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
}
