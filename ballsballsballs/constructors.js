function Ball(x, y, radius) {
    this.radius = radius;
    this.dx = randomDx();
    this.dy = randomDy();
    // mass is that of a sphere, except the constants like PI and 4/3
    // reason for sphere over circle is, well, we're looking at spheres from above, duh
    this.mass = this.radius * this.radius * this.radius;
    this.x = x;
    this.y = y;
    this.color = randomColor();
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
        ctx.closePath();
    };
    this.speed = function() {
        // magnitude of velocity vector
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    };
    this.angle = function() {
        //angle of ball with the xy plane
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