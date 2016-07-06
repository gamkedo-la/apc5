var BallMover = function(_x, _y, _angle, _speed) {
	var x = _x;
	var y = _y;
	var prevX = x;
	var prevY = y;
	var speed = _speed;
	var vx = Math.cos(_angle) * speed;
	var vy = Math.sin(_angle) * speed;

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
		return checkBounds();
	};

	// Check if the next position makes the ball fall out of bounds on the sides.
	var checkBounds = function(){
		var bounds = grid.getBounds();
		if (bounds.left > x) {
			vx = -vx;
			x += (bounds.left - x) * 2;
			return true;
		}
		if (x > bounds.right) {
			vx = -vx;
			x += (bounds.right - x) * 2;
			return true;
		}

		return false;
	};

	var coords = function() {
		return new Point(x, y);
	};

	var coordsPrev = function() {
		return new Point(prevX, prevY);
	};

	return {
		coords: coords,
		coordsPrev: coordsPrev,
		advancePosition: advancePosition
	};
};

var Ball = function (_x, _y, _angle, _v) {
	var value = _v;
	var ballMover = new BallMover(_x, _y, _angle, 15);

	var move = function(){
		ballMover.advancePosition();
		testCurrentHex();
		var coords = ballMover.coords();

		// Very simple out of bounds check for debugging
		if (coords.y < bubbleSize/4){
			console.log("ERROR: Ball out of bounds");
			cannon.clearProjectile();
		}else if (coords.y < bubbleSize) {
			attachToGrid();
			cannon.clearProjectile();
			grid.dropDown();
		}
	};
	
	var draw = function(){
		var coords = ballMover.coords();
		drawBubble(gameContext, coords.x, coords.y, value, bubbleSize);
	};
	
	var testCurrentHex = function(){
		var coords = ballMover.coords();
		var bubble = grid.findBubbleHere(coords.x, coords.y);
		if(bubble){
			if(!bubble.combineColors(bubbleColors.indexOf(value))){
				attachToGrid();
			}
			cannon.clearProjectile();
		}
	};
	
	var attachToGrid = function(){
		var coordsPrev = ballMover.coordsPrev();
		var coords = grid.screenCoordsToGrid(coordsPrev.x, coordsPrev.y);
		grid.handleCombo(grid.attachBubble(coords.x, coords.y, value));
	};
	
	return {
		draw: draw,
		move: move,
	};
};
