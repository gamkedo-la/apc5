var Cannon = function () {
	var x = canvas.width / 2;
	var y = canvas.height;
	var rot = 90;
	var width = 75;
	var height = 10;
	var color = "#AAAAAA";
	var nozzle = width + (bubbleSize - 2);
	var projectile;
	var value = grid.randomBubbleColor();
	var nextValue = grid.randomBubbleColor();
	
	var calculateRotation = function(){
		var yDiff = y - mouse.y;
		var xDiff = x - mouse.x;
		if(xDiff < 0){
			rot = Math.atan(yDiff/xDiff);
		} else {
			rot = Math.atan(yDiff/xDiff) - Math.PI;
		}

		if(rot > -Math.PI/8){
			rot = -Math.PI/8;
		} else if(rot < -Math.PI + Math.PI/8){
			rot = -Math.PI + Math.PI/8;
		}
	};

	var draw = function(){
		colorRect(canvasContext, x,y+10, width+10,height, color, rot, 0, -height/2);
		drawCircleFill(canvasContext, x, y, bubbleSize, grid.bubbleColor[value], 1);
		drawCircleFill(canvasContext, x, y, bubbleSize/2, grid.bubbleColor[nextValue], 1);
	};

	var rotation = function(){
		return rot;
	};
	
	//This should take the object to fire once we get multiple things to shoot
	var fire = function(){
		this.projectile = new Ball(x, y, nozzle, rot, value);
		value = nextValue;
		nextValue = grid.randomBubbleColor();
	};
	
	var swapValues = function(){
		var temp = value;
		value = nextValue;
		nextValue = temp;
	};

	return {
		x: x,
		y: y,
		width: width,
		height: height,
		color: color,
		draw: draw,
		calculateRotation: calculateRotation,
		rotation: rotation,
		fire: fire,
		projectile: projectile,
		nozzle: nozzle,
		swapValues: swapValues,
	};
};
