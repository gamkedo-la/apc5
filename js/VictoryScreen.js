var VictoryScreen = function(){
	var frameCount = 0;
	var framesBetweenSwap = 15;
	var readyToRestart = false;
	var firstRun = true;
	
	var draw = function(){
		Game.draw();
	};
	
	
	var move = function(){
		Game.moveParticles();
		BubblePopper.update();
		
		if(frameCount <= 0){
			if(firstRun){
				makeGrid();
				firstRun = false;
			}else{
				grid.removeBottomRow();
				grid.dropDown();
			}
			cannon = new Cannon();
			frameCount = framesBetweenSwap;
		}
		frameCount--;
		
		if(!mouse.left){
			readyToRestart = true;
		}
		
		if(readyToRestart && mouse.left){
			readyToRestart = false;
			firstRun = true;
			Game.restart();
		}
		
	}
	
	return{
		draw: draw,
		move: move,
	};
}();