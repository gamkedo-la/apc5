var Ball = function (_x, _y, _offset, _angle) {
	var size = bubbleSize;
	var x = _x;// + Math.cos(_angle) * _offset;
	var y = _y;// + Math.sin(_angle) * _offset;
	var prevX = x;
	var prevY = y;
	var speed = 5;
	var vx = Math.cos(_angle) * speed;;
	var vy = Math.sin(_angle) * speed;;
	var value = grid.randomBubbleColor();
	var leftBound = size;
	var rightBound = canvas.width - size;
	
	var move = function(){
		prevX = x;
		prevY = y;
		x += vx;
		y += vy;
		
		// Check if the next position makes the ball fall out of bounds on the sides.
		if (leftBound > x) {
			vx = -vx;
			x += (leftBound - x) * 2;
		}
		if (x > rightBound) {
			vx = -vx;
			x += (rightBound - x) * 2;
		}
		getCurrentHex();
		
		// Very simple out of bounds check for debugging
		if (y < 0) {
			cannon.projectile = undefined;
		}
	};

	var draw = function(){
			drawCenteredImage(canvasContext, grid.bubbleImage[value], x, y);
			//drawCircleFill(canvasContext, center.x, center.y, 26, bubbleColor[bubble.value], 1);
	};

	var getCurrentHex = function(){
		if(grid.findSuitHere(x, y) > 0){
			grid.attatchBall(prevX, prevY, value);
			cannon.projectile = undefined;
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
