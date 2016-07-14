const CANNONBALL = 1;

var PowerupButton = function(_type, _activeAfterNumPopped, _x, _y, _index, _activeColor, _inactiveColor, _hoverColor) {
	var x = _x + (_index * 35);
	var y = _y;
	var offsetX = (gameCanvas.width * drawScaleX * gameWidth) / drawScaleX;
	var width = 15;
	var height = 15;
	var isActive = false;
	var isArmed = false;

	var lastNumPopped = 0;

	var activate = function() {
		isActive = true;
	};

	var deactivate = function() {
		isActive = false;
		isArmed = false;
	};

	var unarm = function() {
		isArmed = false;
	};

	var draw = function() {
		var color = isActive ? _activeColor : _inactiveColor;

		if (isArmed || hover()) {
			color = _hoverColor;
		}
		drawBubble(scoresContext, x, y, color, 15);
	};

	var hover = function() {
		var checkX = mouse.x - offsetX;

		return x+width > checkX && checkX > x-width &&
			y+height > mouse.y && mouse.y > y-height;
	};

	var checkActivate = function(numPopped) {
		if (isActive || isArmed) {
			lastNumPopped = numPopped;
		}
		else {
			isActive = (numPopped - lastNumPopped >= _activeAfterNumPopped);
		}
	};

	var checkClick = function() {
		if (mouse.left && hover()) {
			if (isActive) {
				isArmed = !isArmed;
				cannon.togglePowerUp(isArmed, _type, this);
			}
			mouse.left = false;
			return true;
		}
		return false;
	};

	return {
		activate: activate,
		deactivate: deactivate,
		unarm: unarm,
		draw: draw,
		hover: hover,
		checkActivate: checkActivate,
		checkClick: checkClick
	};
};

var CannonBall = function(_x, _y, _angle) {
	var ballMover = new BallMover(_x, _y, _angle, 15);
	var customPopper = new BubblePopper(0);

	var move = function() {
		var hasBounced = ballMover.advancePosition();

		var coords = ballMover.coords();

		// @todo make the check wider?
		var bubble = grid.findBubbleHere(coords.x, coords.y);
		if (bubble) {
			customPopper.push(bubble);
		}

		if (coords.y < bubbleSize || hasBounced) {
			grid.checkStrayBubbles();

			cannon.clearProjectile();

			createParticles(12, 20, coords.x, coords.y, 'black');
		}

		customPopper.update();
	};

	var draw = function() {
		var coords = ballMover.coords();
		drawBubble(gameContext, coords.x, coords.y, 'black', bubbleSize);

		customPopper.draw();
	};

	return {
		move: move,
		draw: draw
	};
};
