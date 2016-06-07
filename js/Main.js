var canvas, canvasContext, grid, deltaTime, prevTime;

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

function gameStart(){
	grid = new Grid(150, 50);
//	grid.debugScreen(); //VERY intensive debug code. Turn off background refresh to use
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
	var color = "white";
	clear = function(){
		colorRect(0,0, canvas.width,canvas.height, 'white');
	}
	return{
		clear: clear
	}
})();

function drawAll() {
	background.clear();
	cannon.draw();
	
	grid.drawBounds();
	
	//Debug code to output the coordinates of hex containing mouse. Somewhat CPU intensive.
//	var mouseHex = grid.screenCoordsToGrid(mouse.x, mouse.y);
//	console.log(mouseHex.x, mouseHex.y);
}
