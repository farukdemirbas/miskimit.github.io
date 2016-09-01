var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//var width = canvas.width;
//var height = canvas.height;
var canvasColor; //"rgb(240, 230, 230)";
var canvasR = 0;
var canvasG = 0;
var canvasB = 0;
var playerX = canvas.width/2;
var playerY = canvas.height/2;
var playerRadius = 15;
var playerR = 0;
var playerG = 0;
var playerB = 0;
var playerColor = "brown";
var dx = 0; // speed x
var dy = 0; // speed y
var ddx = 0; // force x
var ddy = 0; // force y
var xForce = 1; 	// is assigned to ddx
var yForce = 1; 	// is assigned to ddy.
					// they're basically the same thing as ddx and ddy
					// only added for ease of tweaking 
var leftHeld = false;
var upHeld = false;
var rightHeld = false;
var downHeld = false;

document.addEventListener("keydown", keyDownEvent);
document.addEventListener("keyup", keyUpEvent);

function keyDownEvent(event) {
//set held keys' vars to true
	if (event.keyCode == 37) {
		leftHeld = true;
	}
	if (event.keyCode == 38) {
		upHeld = true;
	}
	if (event.keyCode == 39) {
		rightHeld = true;
	}
	if (event.keyCode == 40) {
		downHeld = true;
	}
//spacebar to stop player
	if (event.keyCode == 32) {

	}
}

function keyUpEvent(event) {
//set pressed keys' vars to false
	if (event.keyCode == 37) {
		leftHeld = false;
	}
	if (event.keyCode == 38) {
		upHeld = false;
	}
	if (event.keyCode == 39) {
		rightHeld = false;
	}
	if (event.keyCode == 40) {
		downHeld = false;
	}
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setAccel() {
	//set ddx and ddy based on input
	if (leftHeld == rightHeld) {
		// if they're BOTH true, or BOTH false,
		// then force should be zero.
		ddx = 0;
	}
	else if (leftHeld) {
		ddx = -xForce;
	}
	else if (rightHeld) {
		ddx = xForce;
	}
	if (upHeld == downHeld) {
		ddy = 0;
	}
	else if (upHeld) {
		ddy = -yForce;
	}
	else if (downHeld) {
		ddy = yForce;
	}

}

function applyAccel() {
	//apply ddx and ddy to player speed
	dx += ddx;
	dy += ddy;
}

function collisionDetection() {
	if (playerX - playerRadius + dx < 0 || playerX + playerRadius + dx > canvas.width) {
		dx *= -1;
		randomPlayerColor();
		randomCanvasColor();
		pageColor();
		titleColor();
		enlargeCanvas("x");
	}
	if (playerY - playerRadius + dy < 0 || playerY + playerRadius + dy > canvas.height) {
		dy *= -1;
		randomPlayerColor();
		randomCanvasColor();
		pageColor();
		titleColor();
		enlargeCanvas("y");
	}
}

function movePlayer() {
	playerX += dx;
	playerY += dy;
}

function drawPlayer() {
	ctx.beginPath();
	ctx.arc(playerX, playerY, playerRadius, 0, 2*Math.PI);
	ctx.fillStyle = playerColor;
	ctx.fill();
	ctx.closePath();
}

function draw() {
	clearCanvas();	// clears.... the canvas. at the start of every iteration.
	setAccel();		// sets ddx and ddy based on user input
	applyAccel();	// applies ddx and ddy onto dx and dy
	collisionDetection(); // ball bouncing, and calls the randomcolor functions
	movePlayer();	// applies dx and dy onto playerX and playerY
	drawPlayer();	// actually draws the player on newly set location
	logShit();		// logs shit like ddx ddy and rgb values for me to check
}

setInterval(draw, 10); // calls draw every 10 milliseconds

function logShit() {
	console.log("dx:", dx, "dy:", dy, "ddx:", ddx, "ddy:", ddy)
	console.log("player color:", playerColor);
	console.log("canvas color:", canvasColor);
}
