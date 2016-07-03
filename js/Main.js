//Global variables
var gameScaleX, gameScaleY;
var drawingCanvas, drawingContext;
var gameCanvas, gameContext;
var scoresCanvas, scoresContext;
var grid, cannon, bubblePopper, deltaTime, prevTime, gameBoard;
var framesPerSecond = 60;
var canvasColor = "#935636", gameBoardColor = "#20AF6F";
var bubbleSize = 30, HEX_TO_CIRCLE_RATIO = Math.sqrt(3)/2;
var minCombo = 3;
var bubbleColors;
var rgbColorList = ["gap", "blue","green","red", "cyan","magenta","yellow", "white"];
var cmykColorList = ["gap", "cyan","magenta","yellow", "blue","green","red", "white"]; 
var textHeight = 16;
var inMenu = false;
var menuBackgroundHeight = 150;
var menuBackgroundWidth = 300;
var menuBackgroundX = 100;
var menuBackgroundY = 100;
var normalModeButtonX = menuBackgroundX + 25;
var normalModeButtonY = menuBackgroundY + 50;
var unlimitedModeButtonX = menuBackgroundX + 25;
var unlimitedModeButtonY = menuBackgroundY + 110;
var menuBackgroundColor = "white";

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
	
	scoresCanvas.width = gameCanvas.width * 0.75;
	scoresCanvas.height = gameCanvas.height;
	
	prevTime = Date.now();
	resizeWindow();
	mainGameLoop = setInterval(updateAll, 1000/framesPerSecond);
	if(inMenu){
		showMainMenu();
		return
	} else {
		startGame();
	}
};

//TODO fix this. Pref using canvas instead of html
//Code to run every time the main game is started (past the main menu)
function startGame(){
//	document.getElementById('powerUps').style.display = 'block';
//	document.getElementById('cannonBall').onclick = function(event){
//		cannon.setCannonball();
//		event.preventDefault();
//	};
	Game.restart();
}

function makeGrid() {
	//Next line is temp code to center the hex grid in the middle of the canvas
	var gridCenterX = bubbleSize / HEX_TO_CIRCLE_RATIO;
	var gridCenterY = bubbleSize / HEX_TO_CIRCLE_RATIO;
	
	grid = new Grid(gridCenterX, gridCenterY, Game.getCs(), Game.getRs(), Game.startRs(), bubbleSize / HEX_TO_CIRCLE_RATIO);
}

function updateAll() {
	gameScaleX = drawingCanvas.width/gameCanvas.width;
	gameScaleY = drawingCanvas.height/gameCanvas.height;
	
	var now = Date.now();
	deltaTime = now - prevTime;
	prevTime = now;
	
	if(Game.checkWin()){
		VictoryScreen.move();
		VictoryScreen.draw();
	} else {
		Game.moveAll();
		drawAll();
	}
}

function drawAll(){
	Game.draw();
	
	drawingContext.save();
	drawingContext.scale(gameScaleX * 0.75, gameScaleY);
	drawingContext.drawImage(gameCanvas, 0, 0);
	drawingContext.restore();
	
	drawingContext.save();
	drawingContext.translate(gameCanvas.width * gameScaleX * 0.75, 0);
	drawingContext.scale(gameScaleX, gameScaleY);
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
}

function showMainMenu(){
	colorRect(drawingContext, menuBackgroundX, menuBackgroundY, menuBackgroundWidth, menuBackgroundHeight, menuBackgroundColor);
	drawingContext.font = "bold 26pt Arial";
	drawingContext.fillStyle = "black";
	drawingContext.fillText("Normal Mode", normalModeButtonX, normalModeButtonY);
	drawingContext.fillText("Unlimited Mode", unlimitedModeButtonX, unlimitedModeButtonY);
}