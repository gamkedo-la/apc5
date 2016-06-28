var Cannon = function () {
	var x = canvas.width / 2;
	var y = canvas.height;
	var rotation = 90;
	var width = 75;
	var height = 10;
	var color = "#AAAAAA";
	var nozzle = width + (bubbleSize - 2);
	var projectile;
	var value = randomColor();
	var nextValue = randomColor();
	var previewBubble = new PreviewBubble(value);
	var nextPowerup;

	const CANNONBALL = 1;

	var calculateRotation = function(){
		var yDiff = y - mouse.y;
		var xDiff = x - mouse.x;
		if(xDiff < 0){
			rotation = Math.atan(yDiff/xDiff);
		} else {
			rotation = Math.atan(yDiff/xDiff) - Math.PI;
		}

		if(rotation > -Math.PI/8){
			rotation = -Math.PI/8;
		} else if(rotation < -Math.PI + Math.PI/8){
			rotation = -Math.PI + Math.PI/8;
		}
	};

	var move = function(){
		calculateRotation();
		if(projectile){
			projectile.move();
		}
	};

	var draw = function(){
		colorRect(canvasContext, x,y+10, width+10,height, color, rotation, 0, -height/2);

		switch (nextPowerup) {
			case CANNONBALL:
				drawCircleFill(canvasContext, x, y, bubbleSize, 'black', 1);
				break;
			default:
				drawCircleFill(canvasContext, x, y, bubbleSize, value, 1);
				drawCircleFill(canvasContext, x, y, bubbleSize/2, nextValue, 1);
				break;
		}

		if(projectile){
			projectile.draw();
		}
		else {
			previewBubble.draw();
		}
	};

	var getRotation = function(){
		return rotation;
	};
	
	//This should take the object to fire once we get multiple things to shoot
	var fire = function(){
		switch (nextPowerup) {
			case CANNONBALL:
				projectile = new CannonBall(x, y, rotation);
				break;
			default:
				projectile = new Ball(x, y, rotation, value);
				value = nextValue;
				nextValue = randomColor();
				previewBubble.setValue(value);
				break;
		}

		if (nextPowerup) {
			nextPowerup = undefined;
		}
	};
	
	var swapValues = function(){
		var temp = value;
		value = nextValue;
		nextValue = temp;

		previewBubble.setValue(value);
	};
	
	function getProjectile(){
		return projectile;
	}
	
	function clearProjectile(){
		projectile = undefined;
	}
	
	function getNozzle(){
		return nozzle;
	}

	function setCannonball() {
		nextPowerup = CANNONBALL;
	}
	
	return {
		move: move,
		draw: draw,
		calculateRotation: calculateRotation,
		getRotation: getRotation,
		fire: fire,
		getProjectile: getProjectile,
		clearProjectile: clearProjectile,
		getNozzle: getNozzle,
		swapValues: swapValues,

		// Powerups
		setCannonball: setCannonball
	};
};
