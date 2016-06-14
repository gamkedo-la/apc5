var Cannon = function () {
	var x = canvas.width / 2;
	var y = canvas.height;
	var rot = 90;
	var width = 75;
	var height = 10;
	var color = "#AAAAAA";

	var calculateRotation = function(){
		var yDiff = y - mouse.y;
		var xDiff = x - mouse.x;
		if(xDiff < 0){
			rot = Math.atan(yDiff/xDiff);
		} else {
			rot = Math.atan(yDiff/xDiff) - Math.PI;
		}

		if(rot > -Math.PI/10){
			rot = -Math.PI/10;
		} else if(rot < -Math.PI + Math.PI/10){
			rot = -Math.PI + Math.PI/10;
		}
	};

	var draw = function(){
		colorRect(canvasContext, x,y, width,height, color, rot, 0, -height/2);
	};

	var rotation = function(){
		return rot;
	};

	return {
		x: x,
		y: y,
		width: width,
		height: height,
		color: color,
		draw: draw,
		calculateRotation: calculateRotation,
		rotation: rotation
	};
};
