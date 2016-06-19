//////////TOOLS FOR USE IN OTHER SCRIPTS//////////

//Find the distance between two coordinates
function distCoords(x1, y1, x2, y2){
	var distX = Math.abs(x1 - x2);
	var distY = Math.abs(y1 - y2);

	return Math.sqrt(distX*distX + distY*distY);
}

//Point class
function Point(_x, _y) {
	this.x = _x;
	this.y = _y;
}

//Find the distance between two points
function distPoints(p1, p2){
	var distX = Math.abs(p1.x - p2.x);
	var distY = Math.abs(p1.y - p2.y);

	return Math.sqrt(distX*distX + distY*distY);
}

function concatUnique(array1, array2){
	return array1.concat(array2.filter(function(n){
		return array1.indexOf(n) < 0;
	}));
}
