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
		}

		customPopper.update();
	};

	var draw = function() {
		var coords = ballMover.coords();
		drawCircleFill(canvasContext, coords.x, coords.y, bubbleSize, 'black', 1);

		customPopper.draw();
	};

	return {
		move: move,
		draw: draw
	};
};
