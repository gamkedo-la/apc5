var Cannon = function () {
	var x = gameCanvas.width / 2;;
	var y = gameCanvas.height;
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
	var powerupButton;
	var maxRotation = Math.PI/16;

	var calculateRotation = function(){
		var yDiff = y - mouse.y;
		var xDiff = x - mouse.x / gameWidth;
		if(xDiff < 0){
			rotation = Math.atan(yDiff/xDiff);
		} else {
			rotation = Math.atan(yDiff/xDiff) - Math.PI;
		}

		if(rotation > -maxRotation){
			rotation = -maxRotation;
		} else if(rotation < -Math.PI + maxRotation){
			rotation = -Math.PI + maxRotation;
		}
	};

	var move = function(){
		calculateRotation();
		if(projectile){
			projectile.move();
		}
	};
	
	var drawDashed = function(){
		var dashGapSize = width/8;
		var maxDashes = 450; //*Note: try and compute rather than hard code
		var xOffset = Math.cos(rotation) * dashGapSize;
		var yOffset = Math.sin(rotation) * dashGapSize;
		var drawX = x;
		var drawY = y+10;
		var dashedRotation = rotation;
		var dashedLineW = dashGapSize/2;
		var dashedLineH = height/8;
		var dashColor = color;
		
		
		var dashFindsBubble = grid.findBubbleHere;
		var bounds = grid.getBounds();
		for(var i=0;i<maxDashes;i++){
			if (dashFindsBubble(drawX,drawY)){
				maxDashes = false;
			}
			if (drawX<bounds.left){
				xOffset = -xOffset;	
				dashedRotation = Math.atan2(yOffset,xOffset);	
			}
			if (drawX>bounds.right){
				xOffset = -xOffset;
				dashedRotation = Math.atan2(yOffset,xOffset);	
			}
			
			colorRect(gameContext, drawX,drawY, dashedLineW,dashedLineH, dashColor, dashedRotation, 0, -dashedLineH/2);
			drawX += xOffset;
			drawY += yOffset;
		}
		
			
	}

	var draw = function(){
		colorRect(gameContext, x,y+10, width+10,height, color, rotation, 0, -height/2);

		switch (nextPowerup) {
			case CANNONBALL:
				drawBubble(gameContext, x, y, 'black', bubbleSize);
				Game.setLastShotPop(true);
				break;
			default:
				drawBubble(gameContext, x, y, value, bubbleSize);
				drawBubble(gameContext, x, y, nextValue, bubbleSize/2);
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
		if(Game.isPopping() || Game.isDropping()){
			return;
		}
		
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
		if (powerupButton) {
			powerupButton.deactivate();
			powerupButton = undefined;
		}
	}
	
	function getNozzle(){
		return nozzle;
	}

	function togglePowerUp(arm, _type, _button) {
		if (powerupButton) {
			console.log('unarm', nextPowerup, powerupButton);
			powerupButton.unarm();
			powerupButton = undefined;
			nextPowerup = undefined;
		}
		if (arm) {
			powerupButton = _button;
			nextPowerup = _type;
			console.log('arm', nextPowerup, powerupButton);
		}
	}
	
	return {
		move: move,
		draw: draw,
		drawDashed: drawDashed,
		calculateRotation: calculateRotation,
		getRotation: getRotation,
		fire: fire,
		getProjectile: getProjectile,
		clearProjectile: clearProjectile,
		getNozzle: getNozzle,
		swapValues: swapValues,
		togglePowerUp: togglePowerUp
	};
};
