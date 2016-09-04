function warning() {
    alert("\nEPILEPSY WARNING! Page contains rapidly flashing elements.\n\nNobody die because of me, thank you.\n");
}

function randomPlayerColor() {
    playerR = Math.floor(Math.random() * 3) * 127;
    playerG = Math.floor(Math.random() * 3) * 127;
    playerB = Math.floor(Math.random() * 3) * 127;
    playerColor = "rgb(" + playerR + ", " + playerG + ", " + playerB + ")";
}

function randomCanvasColor() {
    if (playerR == 127 && playerG == 127 && playerB == 127) {
        canvasR = 255;
        canvasG = 0;
        canvasB = 0;
    } else {
        canvasR = 255 - playerR;
        canvasG = 255 - playerG;
        canvasB = 255 - playerB;
    }
    canvasColor = "rgb(" + canvasR + ", " + canvasG + ", " + canvasB + ")";
    canvas.style.backgroundColor = canvasColor;
}

function pageColor() {
    document.body.style.background = playerColor;
}

function titleColor() {
    document.getElementById("eyecancer").style.color = canvasColor;
    document.getElementById("mighty").style.color = canvasColor;
}

function enlargeCanvas(p) {
    if (p == "x" && canvas.width < 1200) {
        canvas.width += 4;
    } else if (p == "y" && canvas.height < 250) {
        canvas.height += 2;
    }
}
