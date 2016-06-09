//Global variables
var canvas, canvasContext, grid, deltaTime, prevTime;

//Global debug variables
var debugCanvas, debugContext, hexDebug = false, debug = true;
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
	setupInput();

	colorRect(0,0, canvas.width,canvas.height, 'white');

	var framesPerSecond = 60;
	prevTime = Date.now();
	gameStart();
	setInterval(updateAll, 1000/framesPerSecond);
}

//Code to run every time the main game is started (past the main menu)
function gameStart(){
	var numBubbleCols = 10;
	var numBubbleRows = 10;
	
	//Next line is temp code to center the hex grid in the middle of the canvas
	var gridCenterX = (canvas.width - Math.sqrt(3)/2 * 60 * numBubbleCols)/2 + (Math.sqrt(3)/2 * 30)/2;
	var gridCenterY = 50;
	
	grid = new Grid(gridCenterX, gridCenterY, numBubbleCols, numBubbleRows);
	
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

function updateAll() {
	var now = Date.now();
	deltaTime = now - prevTime;
	prevTime = now;
	
	moveAll();
	drawAll();
}

function moveAll() {
	cannon.calculateRotation();
}

//Might redo how the background code works
var background = (function(){
	var color = "#935636";
	clear = function(){
		colorRect(0,0, canvas.width,canvas.height, color);
	}
	return{
		clear: clear
	}
})();

function drawBounds() {
	var marginW = 123;
	var marginH = 20;
	var playableW = canvas.width-marginW*2;
	var playableH = canvas.height-marginH*2;
	var outOfBoundsColor = "#20AF6F";
	colorRect(0,0,canvas.width,marginH,outOfBoundsColor); // top
	colorRect(0,canvas.height-marginH,canvas.width,marginH,outOfBoundsColor); // bottom
	colorRect(0,marginH,marginW,playableH,outOfBoundsColor); // left
	colorRect(canvas.width-marginW,marginH,marginW,playableH,outOfBoundsColor); // right
}

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

	drawBounds();
		
	//Debug code to output coordinates of hex containing mouse
	if(hexDebug){
		var mouseHex = grid.screenCoordsToGrid(mouse.x, mouse.y);
		//console.log(mouseHex.x, mouseHex.y);
	}
}
