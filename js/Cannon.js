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
		drawCircleFill(canvasContext, x, y, bubbleSize, value, 1);
		drawCircleFill(canvasContext, x, y, bubbleSize/2, nextValue, 1);

		if(projectile){
			projectile.draw();
		}
	};

	var getRotation = function(){
		return rotation;
	};
	
	//This should take the object to fire once we get multiple things to shoot
	var fire = function(){
		projectile = new Ball(x, y, nozzle, rotation, value);
		value = nextValue;
		nextValue = randomColor();
	};
	
	var swapValues = function(){
		var temp = value;
		value = nextValue;
		nextValue = temp;
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
	
	return {
//		x: x,
	//	y: y,
		//width: width,
		//height: height,
		//color: color,
		move: move,
		draw: draw,
		calculateRotation: calculateRotation,
		getRotation: getRotation,
		fire: fire,
		getProjectile: getProjectile,
		clearProjectile: clearProjectile,
		getNozzle: getNozzle,
		swapValues: swapValues,
	};
};
