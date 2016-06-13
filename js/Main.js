//Global variables
var canvas, canvasContext, scoresCanvas, scoresContext, grid, cannon, ball, deltaTime, prevTime;
var canvasColor = "#935636", gameBoardColor = "#20AF6F";

//Global debug variables
var hexDebug = false, debug = true;
var useCardSuits = true; // turning to false goes back to color circles

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

	var framesPerSecond = 60;
	prevTime = Date.now();
	gameStart();
	setInterval(updateAll, 1000/framesPerSecond);
};

//Code to run every time the main game is started (past the main menu)
function gameStart(){
	var numBubbleCols = 10;
	var numBubbleRows = 10;
	
	//Next line is temp code to center the hex grid in the middle of the canvas
	var gridCenterX = (canvas.width - Math.sqrt(3)/2 * 60 * numBubbleCols)/2 + (Math.sqrt(3)/2 * 30)/2;
	var gridCenterY = 50;

	grid = new Grid(gridCenterX, gridCenterY, numBubbleCols, numBubbleRows);
	cannon = new Cannon();
	ball = new Ball();
	
	//Debug code that creates and caches a 4 color map of all hexes
	if(hexDebug){
		grid.debugScreen(); //VERY intensive call.
	}
}

function updateAll() {
	var now = Date.now();
	deltaTime = now - prevTime;
	prevTime = now;
	
	moveAll();
	drawAll();
}

function moveAll() {
	cannon.calculateRotation();
	ball.move();
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
		//canvasContext.drawImage(debugCanvas, 0, 0);
		grid.drawBounds();
	}
	cannon.draw();
	grid.drawBubbles();
	ball.draw();

	// For now, only draw the name in the scores context.
	drawText(scoresContext, 25, 20, "#000000", "APC5");

	//Debug code to output coordinates of hex containing mouse
	if(hexDebug){
		var mouseHex = grid.screenCoordsToGrid(mouse.x, mouse.y);
		//console.log(mouseHex.x, mouseHex.y);
	}
}
