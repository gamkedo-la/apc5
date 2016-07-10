const GAME_NORMAL = 1;
const GAME_UNLIMITED = 2;

var Game = function(){
	var numBubbleCols = 16;
	var numBubbleRows = 13;
	var startingRows = 8;
	
	var gameType;
	var popping = false, dropping = false;
	
	var bubblesPopped = 0;
	var popTotalToWin = 100;
	
	var lastShotPop = false;
	var powerUps = [];

	var checkWin = function(){
		// Never 'win' the game when there are still bubbles to pop and particles to render!
		var hasRemainingBubblesToPop = bubblePopper.numRemainingBubbles() > 0;
		var hasRemainingParticles = particleList.length > 0;
		if (hasRemainingBubblesToPop || hasRemainingParticles) {
			return false;
		}

		if (gameType == GAME_NORMAL && bubblesPopped >= popTotalToWin && !lastShotPop){
			return true;
		}
		if (gameType == GAME_UNLIMITED && grid.numRemainingBubbles() == 0) {
			return true;
		}
		return false;
	};
	
	var addPop = function(n){
		bubblesPopped += n;

		for(var p = 0; p < powerUps.length; p++) {
			powerUps[p].checkActivate(bubblesPopped);
		}
	};
	
	var getCols = function(){
		return numBubbleCols;
	};
	
	var getRows = function(){
		return numBubbleRows;
	};
	
	var getStartingRows = function(){
		return startingRows;
	};
	
	var restart = function(_type){
		gameType = GAME_NORMAL;
		if (_type) {
			gameType = _type;
		}
		if(rgbMode){
			bubbleColors = rgbColorList;
		}else{
			bubbleColors = cmykColorList;
		}

		// Reset powerUps
		powerUps = [];
		var x = 40, y = (50 + textHeight * 8);
		powerUps.push(new PowerupButton(CANNONBALL, 10, x, y, powerUps.length, '#000', '#777', '#700'));
		powerUps.push(new PowerupButton(CANNONBALL, 20, x, y, powerUps.length, '#000', '#777', '#700'));

		makeGrid();
		cannon = new Cannon();
		bubblesPopped = 0;
		bubblePopper = new BubblePopper(3);

		//Debug code that creates and caches a 4 color map of all hexes
		if(hexDebug){
			grid.debugScreen(); //VERY intensive call.
			
			debugCanvas = document.createElement('canvas');
			debugContext = debugCanvas.getContext('2d');
			debugCanvas.width = gameCanvas.width;
			debugCanvas.height = gameCanvas.height;
			debugContext.drawImage(gameCanvas, 0, 0);
		}
	};
	
	var draw = function(){
		if (Menu.isActive()) {
			return;
		}

		grid.draw();
		bubblePopper.draw();
		cannon.draw();
		
		for (var i = 0; i < particleList.length; i++) {
			particleList[i].draw();
		}
		
		// For now, only draw the name in the scores context.
		drawText(scoresContext, 25, 50, fontColor, "APC5");
		drawText(scoresContext, 25, 50 + textHeight, fontColor, "Score:");
		drawText(scoresContext, 25, 50 + textHeight * 2, fontColor, bubblesPopped);
		drawText(scoresContext, 25, 50 + textHeight * 4, fontColor, "Shots:");
		drawText(scoresContext, 25, 50 + textHeight * 7, fontColor, "Power ups:");

		for(var p = 0; p < powerUps.length; p++) {
			powerUps[p].draw();
		}

		//Debug code to output coordinates of hex containing mouse
		if(hexDebug){
			var mouseHex = grid.screenCoordsToGrid(mouse.x, mouse.y);
			//console.log(mouseHex.x, mouseHex.y);
		}
	};

	var powerUpsCheckClick = function() {
		for(var p = 0; p < powerUps.length; p++) {
			if (powerUps[p].checkClick()) {
				return true;
			}
		}
		return false;
	};

	var moveAll = function(){
		if (Menu.isActive()) {
			return;
		}
		cannon.move();

		if (mouse.left) {
			if (!powerUpsCheckClick() && !cannon.getProjectile()) {
				cannon.fire();
			}
		}

		moveParticles();
		bubblePopper.update();
	};
	
	var moveParticles = function(){
		var i;
		for (i = 0; i < particleList.length; i++) {
			particleList[i].move();
		}
		for (i = particleList.length-1; i >= 0; i--) {
			if (particleList[i].isReadyToRemove()) {
				particleList.splice(i, 1);
			}
		}
	};
	
	var setLastShotPop = function(val){
		lastShotPop = val;
	};
	
	var getLastShotPop = function(){
		return lastShotPop;
	};
	
	var isPopping = function(){
		return popping;
	};
	
	var isDropping = function(){
		return dropping;
	};
	
	var startPopping = function(){
		popping = true;
	};
	
	var stopPopping = function(){
		popping = false;
	};
	
	var startDropping = function(){
		dropping = true;
	};
	
	var stopDropping = function(){
		dropping = false;
	};
	
	return{
		getCs: getCols,
		getRs: getRows,
		startRs: getStartingRows,
		checkWin: checkWin,
		addPop: addPop,
		restart: restart,
		draw: draw,
		moveAll: moveAll,
		moveParticles: moveParticles,
		getLastShotPop: getLastShotPop,
		setLastShotPop: setLastShotPop,
		
		isPopping: isPopping,
		isDropping: isDropping,
		startPopping: startPopping,
		stopPopping: stopPopping,
		startDropping: startDropping,
		stopDropping: stopDropping,
	};
}();

