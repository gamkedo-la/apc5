var VictoryScreen = function(){
	var frameCount = 0;
	var framesBetweenSwap = 15;
	var readyToRestart = false;
	
	var draw = function(){
		Game.draw();
		
		if(frameCount <= 0){
			makeGrid();
			cannon = new Cannon();
			frameCount = framesBetweenSwap;
		}
		frameCount--;
	};
	
	
	var move = function(){
		Game.moveParticles();
		BubblePopper.update();
		
		if(!mouse.left){
			readyToRestart = true;
		}
		
		if(readyToRestart && mouse.left){
			readyToRestart = false;
			Game.restart();
		}
	}
	
	return{
		draw: draw,
		move: move,
	};
}();