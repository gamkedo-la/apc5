var canvas, canvasContext;

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
	setInterval(updateAll, 1000/framesPerSecond);
}

function gameStart(){
	//Initialization stuff goes here
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
//	var mouseRow = getMouseRow();
}

/*
function getMouseRow(){
	var q = (mouse.x * Math.sqrt(3)/3 - mouse.y / 3) / grid.size;
	var r = mouse.y * 2/3 / grid.size;
	console.log(mouse.x + ", " + mouse.y + ", " + grid.size + "\n" + q + ", " + r);
}
*/

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
}
