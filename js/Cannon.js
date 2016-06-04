var cannon = (function () {
	var x = 400;
	var y = 600;
	var width = 75;
	var height = 10;
	var color = "green";
	
	var calculateRotation = function(){
		var yDiff = y - mouse.y;
		var xDiff = x - mouse.x;
		if(xDiff < 0){
			return Math.atan(yDiff/xDiff);
		} else {
			return Math.atan(yDiff/xDiff) - Math.PI;
		}
	};
	
	var draw = function(){
		console.log("Test");
		var rot = calculateRotation();
		colorRect(x,y, width,height, color, rot, 0, -height/2);
	};
	return {
		x: x,
		y: y,
		width: width,
		height: height,
		color: color,
		draw: draw
	};
})();
