//Global variables
var drawScaleX, drawScaleY;
var drawingCanvas, drawingContext;
var gameCanvas, gameContext, gameWidth = 0.75;
var scoresCanvas, scoresContext;
var grid, cannon, bubblePopper, deltaTime, prevTime, gameBoard;
var framesPerSecond = 60;
var gameFont = "bold 20pt Arial";
var canvasColor = "#935636", gameBoardColor = "#20AF6F", fontColor = '#000000', fontColorHighlight = '#aaf8d4';
var bubbleSize = 30, HEX_TO_CIRCLE_RATIO = Math.sqrt(3)/2;
var minCombo = 3;
var bubbleColors;
var rgbColorList = ["gap", "blue","green","red", "cyan","magenta","yellow", "white"];
var cmykColorList = ["gap", "cyan","magenta","yellow", "blue","green","red", "white"];
var textHeight = 30;

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
	drawingCanvas = document.getElementById('drawingCanvas');
	drawingContext = drawingCanvas.getContext('2d');
	window.addEventListener("resize", resizeWindow);
	
	gameBoard = document.getElementById('gameBoard');
	gameCanvas = document.getElementById('gameCanvas');
	gameContext = gameCanvas.getContext('2d');
	scoresCanvas = document.getElementById('scoresCanvas');
	scoresContext = scoresCanvas.getContext('2d');
	setupInput();
	
	colorRect(gameContext, 0,0, gameCanvas.width,gameCanvas.height, canvasColor);
	colorRect(scoresContext, 0,0, scoresCanvas.width,scoresCanvas.height, gameBoardColor);
	
	gameCanvas.width = ((Game.getCs() - 0.5) * bubbleSize + bubbleSize / HEX_TO_CIRCLE_RATIO) * 2;
	gameCanvas.height = gameCanvas.width * 9/12;
	
	scoresCanvas.width = gameCanvas.width * gameWidth;
	scoresCanvas.height = gameCanvas.height;
	
	prevTime = Date.now();
	resizeWindow();
	mainGameLoop = setInterval(updateAll, 1000/framesPerSecond);
	startGame();
};

//TODO fix this. Pref using canvas instead of html
//Code to run every time the main game is started (past the main menu)
function startGame(){
//	document.getElementById('powerUps').style.display = 'block';
//	document.getElementById('cannonBall').onclick = function(event){
//		cannon.setCannonball();
//		event.preventDefault();
//	};
	Menu.initialize();
	Game.restart();
}

function makeGrid() {
	//Next line is temp code to center the hex grid in the middle of the canvas
	var gridCenterX = bubbleSize / HEX_TO_CIRCLE_RATIO;
	var gridCenterY = bubbleSize / HEX_TO_CIRCLE_RATIO;
	
	grid = new Grid(gridCenterX, gridCenterY, Game.getCs(), Game.getRs(), Game.startRs(), bubbleSize / HEX_TO_CIRCLE_RATIO);
}

function updateAll() {
	var now = Date.now();
	deltaTime = now - prevTime;
	prevTime = now;

	background.clear();

	if (Menu.isActive()) {
		Menu.update();
		Menu.draw();
	}
	if (Menu.isActive() || Game.checkWin()){
		VictoryScreen.move();
		VictoryScreen.draw();
	} else {
		Game.moveAll();
		Game.draw();
	}

	drawingContext.save();
	drawingContext.scale(drawScaleX * gameWidth, drawScaleY);
	drawingContext.drawImage(gameCanvas, 0, 0);
	drawingContext.restore();
	
	drawingContext.save();
	drawingContext.translate(gameCanvas.width * drawScaleX * gameWidth, 0);
	drawingContext.scale(drawScaleX, drawScaleY);
	drawingContext.drawImage(scoresCanvas, 0, 0);
	drawingContext.restore();
}

//Might redo how the background code works
var background = (function(){
	clear = function(){
		colorRect(gameContext, 0,0, gameCanvas.width,gameCanvas.height, canvasColor);
		colorRect(scoresContext, 0,0, scoresCanvas.width,scoresCanvas.height, gameBoardColor);
		
		//Debug code to draw a representation of the hex on screen
		if(hexDebug){
			//Pick one, comment the other out
			gameContext.drawImage(debugCanvas, 0, 0);
			//grid.drawBounds();
		}
	};
	return{
		clear: clear
	}
})();

function resizeWindow(){
	gameBoard.height = window.innerHeight;
	gameBoard.width = window.innerWidth;

	if(window.innerHeight / 9 > window.innerWidth / 16){
		drawingCanvas.width = window.innerWidth;
		drawingCanvas.height = window.innerWidth * 9/16;
	}else{
		drawingCanvas.height = window.innerHeight;
		drawingCanvas.width = window.innerHeight * 16/9;
	}

	drawingCanvas.style.top = (window.innerHeight/2 - drawingCanvas.height/2) + "px";
	drawingCanvas.style.left = (window.innerWidth/2 - drawingCanvas.width/2) + "px";
	colorRect(drawingContext, 0,0, drawingCanvas.width,drawingCanvas.height, "white");

	drawScaleX = drawingCanvas.width/gameCanvas.width;
	drawScaleY = drawingCanvas.height/gameCanvas.height;
}
