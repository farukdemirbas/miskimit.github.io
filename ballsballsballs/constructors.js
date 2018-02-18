function Ball(x, y, radius) {
    this.radius = radius;
    this.dx = randomDx();
    this.dy = randomDy();
    // mass is that of a sphere as opposed to circle.
    // it *does* make a difference.
    this.mass = this.radius * this.radius * this.radius;
    this.x = x;
    this.y = y;
    this.color = randomColor();
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.stroke();
        ctx.closePath();
    };
    this.speed = function() {
        // magnitude of velocity vector
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    };
    this.angle = function() {
        //angle of ball with the x axis
        return Math.atan2(this.dy, this.dx);
    };
    this.kineticEnergy = function () {
    // only for masturbation purposes, not rly used for computation.
        return (0.5 * this.mass * this.speed() * this.speed());
    };
    this.onGround = function() {
        return (this.y + this.radius >= canvas.height)
    }
}