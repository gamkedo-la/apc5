var Ball = function (_x, _y, _offset, _angle, _v) {
	var size = bubbleSize;
	var x = _x;
	var y = _y;
	var prevX = x;
	var prevY = y;
	var speed = 15;
	var vx = Math.cos(_angle) * speed;
	var vy = Math.sin(_angle) * speed;
	var value = _v;
	
	var move = function(){
		advancePosition();
		testCurrentHex();
		
		// Very simple out of bounds check for debugging
		if (y < bubbleSize/4){ 
			console.log("ERROR: Ball out of bounds");
			cannon.clearProjectile();
		}else if (y < bubbleSize) {
			attachToGrid();
		}
	};
	
	var reversePosition = function(){
		x -= vx * deltaTime/(1000/framesPerSecond) * 2;
		y -= vy * deltaTime/(1000/framesPerSecond) * 2;
		checkBounds();
		prevX = x;
		prevY = y;
		x += vx * deltaTime/(1000/framesPerSecond);
		y += vy * deltaTime/(1000/framesPerSecond);
		checkBounds();
	};
	
	var advancePosition = function(){
		prevX = x;
		prevY = y;
		x += vx * deltaTime/(1000/framesPerSecond);
		y += vy * deltaTime/(1000/framesPerSecond);
		checkBounds();
	};
	
	// Check if the next position makes the ball fall out of bounds on the sides.
	var checkBounds = function(){
		if (grid.leftBound > x) {
			vx = -vx;
			x += (grid.leftBound - x) * 2;
		}
		if (x > grid.rightBound) {
			vx = -vx;
			x += (grid.rightBound - x) * 2;
		}
	};
	
	var draw = function(){
		drawCircleFill(canvasContext, x, y, bubbleSize, value, 1);
	};
	
	var testCurrentHex = function(){
		var bubble = grid.findBubbleHere(x, y);
		if(bubble){
			if(!bubble.combineColors(bubbleColors.indexOf(value))){
				attachToGrid();
			}
			cannon.clearProjectile();
		}
	};
	
	var attachToGrid = function(){
		var coords = grid.screenCoordsToGrid(prevX, prevY)
		grid.handleCombo(grid.attachBubble(coords.x, coords.y, value));
	};
	
	return {
		draw: draw,
		move: move,
	};
};
