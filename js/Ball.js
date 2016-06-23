var Ball = function (_x, _y, _offset, _angle, _v) {
	var size = bubbleSize;
	var x = _x;
	var y = _y;
	var prevX = x;
	var prevY = y;
	var speed = 10;
	var vx = Math.cos(_angle) * speed;
	var vy = Math.sin(_angle) * speed;
	var value = _v;
	var leftBound = size;
	var rightBound = canvas.width - size;
	
	var move = function(){
		advancePosition();
		getCurrentHex();
		
		// Very simple out of bounds check for debugging
		if (y < bubbleSize) {
			grid.attachBall(prevX, prevY, value);
/*			if(!grid.attachBall(prevX, prevY, value)){
				reversePosition();
			}
*/
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
		if (leftBound > x) {
			vx = -vx;
			x += (leftBound - x) * 2;
		}
		if (x > rightBound) {
			vx = -vx;
			x += (rightBound - x) * 2;
		}
	};
	
	var draw = function(){
		drawCircleFill(canvasContext, x, y, 26, grid.bubbleColor[value], 1);
	};

	var getCurrentHex = function(){
		if(grid.findSuitHere(x, y) > 0){
			grid.attachBall(prevX, prevY, value);
		}
	};
	
	return {
		x: x,
		y: y,
		size: size,
		draw: draw,
		move: move,
		prevX: prevX,
		prevY: prevY,
		value: value,
	};
};
