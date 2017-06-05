function Ball(x, y, radius) {
    this.radius = radius;
    this.dx = randomDx();
    this.dy = randomDy();
    this.mass = this.radius * this.radius * this.radius;
    this.x = x
    this.y = y
    this.color = randomColor();
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
    this.speed = function() {
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    };
    this.angle = function() {
        return Math.atan2(this.dy, this.dx);
    };
    this.kineticEnergy = function () {
        return (0.5 * this.mass * this.speed() * this.speed());
    };
}