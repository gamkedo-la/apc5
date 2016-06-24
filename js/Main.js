//Global variables
var canvas, canvasContext, scoresCanvas, scoresContext, grid, cannon, deltaTime, prevTime;
var framesPerSecond = 60;
var canvasColor = "#935636", gameBoardColor = "#20AF6F";
var bubbleSize = 26, HEX_TO_CIRCLE_RATIO = Math.sqrt(3)/2;
var minCombo = 3;
var explodeDelayIncrease = 6;

//Global debug variables
var hexDebug = false, debug = true, debugCanvas, debugContext, mainGameLoop;
var useCardSuits = true; // turning to false goes back to color circles
var particleList = [];


//Prevents player from drag selecting
document.onselectstart = function()
{
    window.getSelection().removeAllRanges();
};

//Prevents player from drag selecting
document.onmousedown = function()
{
    window.getSelection().removeAllRanges();
};

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	scoresCanvas = document.getElementById('scoresCanvas');
	scoresContext = scoresCanvas.getContext('2d');
	setupInput();

	colorRect(canvasContext, 0,0, canvas.width,canvas.height, canvasColor);
	colorRect(scoresContext, 0,0, scoresCanvas.width,scoresCanvas.height, gameBoardColor);

	prevTime = Date.now();
	gameStart();
	mainGameLoop = setInterval(updateAll, 1000/framesPerSecond);
};

//Code to run every time the main game is started (past the main menu)
function gameStart(){
	makeGrid();
	cannon = new Cannon();
	
	//Debug code that creates and caches a 4 color map of all hexes
	if(hexDebug){
		grid.debugScreen(); //VERY intensive call.
		
		debugCanvas = document.createElement('canvas');
		debugContext = debugCanvas.getContext('2d');
		debugCanvas.width = canvas.width;
		debugCanvas.height = canvas.height;
		debugContext.drawImage(canvas, 0, 0);
	}
}

function makeGrid() {
	var numBubbleCols = 10;
	var numBubbleRows = 11;
	var filledRows = 8;
	var circleToHexRatio = 2/Math.sqrt(3);
	//Next line is temp code to center the hex grid in the middle of the canvas
	var gridCenterX = bubbleSize * circleToHexRatio;
	var gridCenterY = bubbleSize * circleToHexRatio;
	
	grid = new Grid(gridCenterX, gridCenterY, numBubbleCols, numBubbleRows, filledRows, bubbleSize * circleToHexRatio);
}

function updateAll() {
	var now = Date.now();
	deltaTime = now - prevTime;
	prevTime = now;
	
	moveAll();

	grid.explodeAllBubbles();
	drawAll();
}

function moveAll() {
	cannon.calculateRotation();
	if(cannon.projectile){
		cannon.projectile.move();
	}
	var i;
	for (i = 0; i < particleList.length; i++) {
		particleList[i].move();
	}
	for (i = particleList.length-1; i >= 0; i--) {
		if (particleList[i].isReadyToRemove()) {
			particleList.splice(i, 1);
		}
	}
}

//Might redo how the background code works
var background = (function(){
	clear = function(){
		colorRect(canvasContext, 0,0, canvas.width,canvas.height, canvasColor);
		colorRect(scoresContext, 0,0, scoresCanvas.width,scoresCanvas.height, gameBoardColor);
	};
	return{
		clear: clear
	}
})();

function drawAll() {
	background.clear();

	//Debug code to draw a representation of the hex on screen
	if(hexDebug){
		//Pick one, comment the other out
		canvasContext.drawImage(debugCanvas, 0, 0);
		//grid.drawBounds();
	}
	
	grid.drawAllBubbles();
	cannon.draw();
	if(cannon.projectile){
		cannon.projectile.draw();
	}

	for (var i = 0; i < particleList.length; i++) {
		particleList[i].draw();
	}

	// For now, only draw the name in the scores context.
	drawText(scoresContext, 25, 20, "#000000", "APC5");

	//Debug code to output coordinates of hex containing mouse
	if(hexDebug){
		var mouseHex = grid.screenCoordsToGrid(mouse.x, mouse.y);
		//console.log(mouseHex.x, mouseHex.y);
	}
}
