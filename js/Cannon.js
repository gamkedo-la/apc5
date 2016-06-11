var cannon = (function () {
	var x = 400;
	var y = 600;
	var rot = 90;
	var width = 75;
	var height = 10;
	var color = "#AAAAAA";
	var ballSize = 25;
	var ballX = 0;
	var ballY = 0;
	var ballSpeed = 5;
	var ballSpeedX = 0;
	var ballSpeedY = 0;
	var ballColor = "#00FFFF";
	var ballFired = false;
	
	var calculateRotation = function(){
		var yDiff = y - mouse.y;
		var xDiff = x - mouse.x;
		if(xDiff < 0){
			rot = Math.atan(yDiff/xDiff);
		} else {
			rot = Math.atan(yDiff/xDiff) - Math.PI;
		}
	};

	var resetBall = function(){
		ballFired = true;

		// Make sure the ball is set right at the end of the cannon barrel
		var nozzle = width + (ballSize - 2);
		ballX = x + Math.cos(rot) * nozzle;
		ballY = y + Math.sin(rot) * nozzle;

		// Calculate the speed
		ballSpeedX = Math.cos(rot) * ballSpeed;
		ballSpeedY = Math.sin(rot) * ballSpeed;
	};

	var moveBall = function(){
		if (mouse.left && !ballFired) {
			resetBall();
		}
		if (!ballFired) {
			return;
		}

		ballX += ballSpeedX;
		ballY += ballSpeedY;
	};

	var move = function(){
		moveBall();
		calculateRotation();
	};
	
	var draw = function(){
		colorRect(x,y, width,height, color, rot, 0, -height/2);
		if (ballFired) {
			drawCircleFill(ballX, ballY, ballSize, ballColor, 1);
		}
	};
	
	return {
		x: x,
		y: y,
		width: width,
		height: height,
		color: color,
		draw: draw,
		move: move,
		rot: rot
	};
})();
