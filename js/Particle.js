var Particle = function(start_x,start_y){
	var x = start_x;
	var y = start_y;
	var vx = 5 - Math.random()*8;
	var vy = 5 - Math.random()*8;
	var size = bubbleSize / 2;
	var leftBound = size;
	var rightBound = canvas.width - size;
	var cyclesLeft = 80 + Math.floor(Math.random() * 20);
	var readyToRemove = false;
	var gravity = 0.1;

	var move = function() {
		cyclesLeft--;
		if (cyclesLeft < 0) {
			readyToRemove = true;
		}

		size = bubbleSize * cyclesLeft / 100;

		leftBound = size;
		rightBound = canvas.width - size;

		// Make the particle slowly fall downward!
		vy += gravity;

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

		if (y > canvas.height || y < 0) {
			readyToRemove = true;
		}
	};

	var draw = function() {
		drawCircleFill(canvasContext, x, y, size, 'red', 1);
	};

	var isReadyToRemove = function() {
		return readyToRemove;
	};

	return {
		x: x,
		y: y,
		move: move,
		draw: draw,
		isReadyToRemove: isReadyToRemove
	};
};
