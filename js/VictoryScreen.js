var VictoryScreen = function(){
	var frameCount = 0;
	var framesBetweenSwap = 20;
	var readyToRestart = false;
	var firstRun = true;
	
	var draw = function(){
		grid.drawAllBubbles();
		bubblePopper.draw();
	};
	
	var move = function(){
		Game.moveParticles();
		bubblePopper.update();
		
		if(frameCount <= 0){
			if(firstRun){
				makeGrid();
				firstRun = false;
			}else{
				grid.removeBottomRow();
				grid.dropDown();
			}
			frameCount = framesBetweenSwap;
		}
		frameCount--;
		
		if(!mouse.left){
			readyToRestart = true;
		}
		
		if(readyToRestart && mouse.left){
			readyToRestart = false;
			firstRun = true;
			mouse.left = false;
			Game.restart();
		}
	};
	
	return{
		draw: draw,
		move: move,
	};
}();
