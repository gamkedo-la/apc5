var Grid = function (_offsetX, _offsetY, _cols, _rows, initialRows) {
	var offsetX = _offsetX;
	var offsetY = _offsetY;
	var cols = _cols;
	var rows = _rows;
	var size = 30;
	var hexHeight = size * 2;
	var hexWidth = Math.sqrt(3)/2 * hexHeight;
	var spacingX = hexWidth;
	var spacingY = hexHeight * 3/4;
	
	const BUBBLE_NONE = 0;
	const BUBBLE_RED = 1;
	const BUBBLE_GREEN = 2;
	const BUBBLE_BLUE = 3;
	const BUBBLE_ORANGE = 4;
	const BUBBLE_KINDS = 5;
	
	//2D array
	var bubbleArray = [];
	bubbleArray[_cols, _rows] = BUBBLE_NONE;
	
	var bubbleColor = ["gap","red","green","blue","orange"];
	var bubbleSuit = ["none","heart","spade","diamond","club"];
	var bubbleImage = [null,imgBubbleHeart,imgBubbleSpade,imgBubbleDiamond,imgBubbleClub];
	
	//TODO is this still needed with the new coordinate system?
	var bubbleCRToIndex = function(atC,atR) {
		return atC + (atR+atC/2) * cols;
	};
	
	//Finds the suit/color at a given pixel
	var findSuitHere = function(x, y){
		var hex = screenCoordsToGrid(x, y);
		console.log(hex.x + ", " + hex.y + ": " + 
		            (useCardSuits ? bubbleSuit[bubbleArray[hex.x, hex.y]]
		             : bubbleColor[bubbleArray[hex.x, hex.y]]));
	};
	
	var drawBubbleAt = function(c, r) {
		var bubbleHere = bubbleArray[c, r];
		if(bubbleHere != BUBBLE_NONE) {
			var center = gridCoordsToScreen(c, r);
			if(useCardSuits) {
				drawCenteredImage(canvasContext, bubbleImage[bubbleHere], center.x, center.y);
			} else {
				drawCircleFill(canvasContext, center.x, center.y, 26, bubbleColor[bubbleHere], 1);
			}
		}
	};
	
	var genStartBubbles = function(){
		for(var c = 0; c < cols; c++){
			for(var r = 0; r < initialRows; r++){
				bubbleArray[c, r] = ( Math.floor(Math.random()*(BUBBLE_KINDS - 1)) + 1);
			}
		}
		
		for(var c = 0; c < cols; c++){
			for(var r = initialRows; r < rows; r++){
				bubbleArray[c, r] = BUBBLE_NONE;
			}
		}
	};
	genStartBubbles(); // NOTE: immediatly calling this function ^
	
	//Find corner i of hex at Point "center"
	var hexCorner = function(center, i){
	    var angleDeg = 60 * i   + 30;
	    var angleRad = Math.PI / 180 * angleDeg;
	    return new Point(center.x + size * Math.cos(angleRad),
			                 center.y + size * Math.sin(angleRad))
	};
	
	//TODO test with new grid system
	var gridCoordsToArray = function(q, r){
		var y = r;
		var x = q + Math.floor(y/2);
		return new Point(x, y);
	}
	
	var drawBubbles = function(){
		for(var r = 0; r < rows; r++){
			for(var c = 0; c < cols; c++){
				drawBubbleAt(c, r);
			}
		}
	};
	
	//Draw bounds of all hexes in grid
	var drawBounds = function(){
		for(var r = 0; r < rows; r++){
			for(var c = 0; c < cols; c++){
				drawHex(c, r);
			}
		}
	};
	
	//Draw the bounds around a hex
	var drawHex = function(c, r){
		var hexCenter = gridCoordsToScreen(c, r);
		var hexPoints = [];
		
		for(var i = 0; i < 7; i++){
			hexPoints[i] = hexCorner(hexCenter, i);
		}
		
		drawLines(canvasContext, hexPoints);
	};
	
	//Take hex coordinates and return center in pixel coordinates
	var gridCoordsToScreen = function (c, r){
		var x = offsetX + c * spacingX + r%2 * spacingX/2;
		var y = offsetY + r * spacingY;
		
		return new Point(x, y);
	};
	
	//Take pixel coordinates and return coordinates of hex that pixel is in
	var screenCoordsToGrid = function(x, y){
		var q = ((x - offsetX) * Math.sqrt(3)/3 - (y - offsetY)/3) / size;
		var r = (y - offsetY) * 2/3 / size;
		
		var hex = hexRound(new Point(q, r));
		hex.x += Math.floor(hex.y / 2);
		
    return hex;
	};
	
	//Generate 4 color map of hex grid
	var debugScreen = function(){
		var curHex = new Point(0, 0);
		for(var i = 0; i < canvas.width; i++){
			for(var j = 0; j < canvas.height; j++){
				curHex = screenCoordsToGrid(i, j);
				if(Math.round(curHex.x) % 2 === 0){
					if(Math.round(curHex.y) % 2 === 0){
						drawPixel(canvasContext, i, j, "red");
					} else {
						drawPixel(canvasContext, i, j, "green");
					}
				} else {
					if(Math.round(curHex.y) % 2 === 0){
						drawPixel(canvasContext, i, j, "blue");
					} else {
						drawPixel(canvasContext, i, j, "yellow");
					}
				}
			}
		}
	};
	
	//Corrects trapezoidal grid into hex grid
	var hexRound = function(h){
		h.z = -h.x - h.y;
		var rx = Math.round(h.x);
		var ry = Math.round(h.y);
		var rz = Math.round(h.z);
		
		var x_diff = Math.abs(rx - h.x);
		var y_diff = Math.abs(ry - h.y);
		var z_diff = Math.abs(rz - h.z);
		
		if(x_diff > y_diff && x_diff > z_diff){
			rx = -ry-rz
		}else if(y_diff > z_diff){
			ry = -rx-rz
		}
		
		return new Point(rx, ry);
	};

	return {
		size: size,
		screenCoordsToGrid: screenCoordsToGrid,
		findSuitHere: findSuitHere,
		drawBounds: drawBounds,
		hexRound: hexRound,
		debugScreen: debugScreen,
		drawBubbles: drawBubbles,
		gridCoordsToArray: gridCoordsToArray
	};
};
