//Global variables
var canvas, canvasContext, scoresCanvas, scoresContext, grid, cannon, bubblePopper, deltaTime, prevTime;
var framesPerSecond = 60;
var canvasColor = "#935636", gameBoardColor = "#20AF6F";
var bubbleSize = 26, HEX_TO_CIRCLE_RATIO = Math.sqrt(3)/2;
var minCombo = 3;
var bubbleColors;
var rgbColorList = ["gap", "blue","green","red", "cyan","magenta","yellow", "white"];
var cmykColorList = ["gap", "cyan","magenta","yellow", "blue","green","red", "white"]; 
var textHeight = 16;

//Global debug variables
var hexDebug = false, debug = true, debugCanvas, debugContext, mainGameLoop;
var useCardSuits = true; // turning to false goes back to color circles
var particleList = [];
var rgbMode = true;

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
	startGame();
	mainGameLoop = setInterval(updateAll, 1000/framesPerSecond);
};

//Code to run every time the main game is started (past the main menu)
function startGame(){
	document.getElementById('powerUps').style.display = 'block';
	document.getElementById('cannonBall').onclick = function(event){
		cannon.setCannonball();
		event.preventDefault();
	};
	Game.restart();
}

function makeGrid() {
	var circleToHexRatio = 2/Math.sqrt(3);
	//Next line is temp code to center the hex grid in the middle of the canvas
	var gridCenterX = bubbleSize * circleToHexRatio;
	var gridCenterY = bubbleSize * circleToHexRatio;
	
	grid = new Grid(gridCenterX, gridCenterY, Game.getCs(), Game.getRs(), Game.startRs(), bubbleSize * circleToHexRatio);
}

function updateAll() {
	var now = Date.now();
	deltaTime = now - prevTime;
	prevTime = now;
	
	if(Game.checkWin()){
		VictoryScreen.move();
		VictoryScreen.draw();
	} else {
		Game.moveAll();
		Game.draw();
	}
}

//Might redo how the background code works
var background = (function(){
	clear = function(){
		colorRect(canvasContext, 0,0, canvas.width,canvas.height, canvasColor);
		colorRect(scoresContext, 0,0, scoresCanvas.width,scoresCanvas.height, gameBoardColor);
		
		//Debug code to draw a representation of the hex on screen
		if(hexDebug){
			//Pick one, comment the other out
			canvasContext.drawImage(debugCanvas, 0, 0);
			//grid.drawBounds();
		}
	};
	return{
		clear: clear
	}
})();
