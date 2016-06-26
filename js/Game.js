var Game = function(){
	var numBubbleCols = 10;
	var numBubbleRows = 11;
	var startingRows = 8;
	
	var bubblesPopped = 0;
	var popTotalToWin = 100;
	
	var checkWin = function(){
		if(bubblesPopped >= popTotalToWin){
			return true;
		}
		return false;
	};
	
	var addPop = function(n){
		bubblesPopped += n;
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
	
	var restart = function(){
		if(rgbMode){
			bubbleColors = rgbColorList;
		}else{
			bubbleColors = cmykColorList;
		}
		makeGrid();
		cannon = new Cannon();
		bubblesPopped = 0;
		BubblePopper.restart();
		
		//Debug code that creates and caches a 4 color map of all hexes
		if(hexDebug){
			grid.debugScreen(); //VERY intensive call.
			
			debugCanvas = document.createElement('canvas');
			debugContext = debugCanvas.getContext('2d');
			debugCanvas.width = canvas.width;
			debugCanvas.height = canvas.height;
			debugContext.drawImage(canvas, 0, 0);
		}
	};
	
	var draw = function(){
		background.clear();
		
		grid.drawAllBubbles();
		BubblePopper.draw();
		cannon.draw();
	
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
	};
	
	var moveAll = function(){
		cannon.move();
		moveParticles();
		BubblePopper.update();
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
	};
}();

