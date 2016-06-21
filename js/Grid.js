var Grid = function (_offsetX, _offsetY, _cols, _rows, initialRows, _size) {
	var offsetX = _offsetX;
	var offsetY = _offsetY;
	var cols = _cols;
	var rows = _rows;
	var size = _size;
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
	
	var bubbleArray = [];
	
	//Make bubbleArray 2D
	for(var i = 0; i < cols; i++){
		bubbleArray[i] = [];
	}
	
	var bubbleColor = ["gap","red","green","blue","orange"];
	var bubbleSuit = ["none","heart","spade","diamond","club"];
	var bubbleImage = [null,imgBubbleHeart,imgBubbleSpade,imgBubbleDiamond,imgBubbleClub];
	
	//Runs func on all bubbles and returns the results in
	//a 2D array corresponding with the bubble's position
	var runOnAllBubbles = function(func){
		var results = [];
		for(var i = 0; i < cols; i++){
			results[i] = [];
		}
		
		for(var r = 0; r < rows; r++){
			for(var c = 0; c < cols; c++){
				if(bubbleArray[c][r]){
					results[c][r] = func(bubbleArray[c][r]);
				}
			}
		}
		return results;
	};
	
	//Marks all bubbles as not connected then checks each
	//one and marks connected bubbles as such
	var checkConnected = function(){
		runOnAllBubbles(function(b){
			b.connected = false;
		});
		
		runOnAllBubbles(checkConnectedHelper);
		
		//Need to make a Bubble.pop function or some such
		//runOnAllBubbles(function(b){if(!b.connected){b.pop;}});
	};
	
	//Recursively searches for connected bubbles from neighbors, marking as it goes
	var checkConnectedHelper = function(connectedBubbles, bubbleIndex){
		//If this is called on a single bubble we need to make the array and set the index
		if(bubbleIndex === undefined){
			bubbleIndex = 0;
			connectedBubbles = [connectedBubbles];
		}
		
		var curBubble = connectedBubbles[bubbleIndex];
		//This only happens if we run out of bubbles, which means we couldn't find a
		//bubble in row == 0, which means we are disconnected
		if(!curBubble){
			return false;
		}
		
		//Recursive base step
		if(curBubble.row === 0){
			curBubble.connected = true;
			return true;
		} else if(curBubble.connected){
			return true;
		}
		
		//Add all as-yet unadded neighbors to the array
		connectedBubbles = concatUnique(connectedBubbles,
		 checkAllAdjacentBubbles(curBubble, function(adjacentBubble){
			if(adjacentBubble){return adjacentBubble;}
		}));
		
		//Recursive call
		var result = checkConnectedHelper(connectedBubbles, bubbleIndex + 1);
		curBubble.connected = result;
		
		return result;
	};
	
	//Check if the current bubble is of the same type as the next one
	var checkBubble = function(nextBubble, thisBubble){
		if(nextBubble){
			if(thisBubble.value === nextBubble.value){
				return nextBubble;
			}
		}
		return false;
	};
	
	//Runs check on all adjacent bubbles
	//Returns array with all that pass
	var checkAllAdjacentBubbles = function(bubble, check){
		var bubblesThatPass = [];
		var inBoundsCol;
		var checkResult;
		
		var c = bubble.col;
		var r = bubble.row;
		
		var leftRow = r%2 === 0 ? -1 : 0;
		c += leftRow;
		
		for(var i = 0; i < 2; i++){
			for(var j = -1; j < 2; j++){
				
				//Don't check self
				if(j === 0 && i + leftRow === 0){
					inBoundsCol = bubbleArray[c + i - (2*leftRow + 1)];
				} else { //but check all other neighbors
					inBoundsCol = bubbleArray[c + i];
				}
				
				if(!inBoundsCol){continue;} //Don't check out of col bounds
				checkResult = check(inBoundsCol[r + j], bubble);
				
				//If the check passed, add it to the array
				if(checkResult){
					bubblesThatPass = bubblesThatPass.concat(checkResult);
				}
			}
		}
		return bubblesThatPass;
	};
	
	//Attatch new bubble first, then call this function on it
	//Finds combo of bubbles that pass checkBubble. Only checks each bubble once.
	//Returns array with all bubbles in the combo.
	var findCombo = function(c, r){
		var bubbleCombo = [bubbleArray[c][r]];
		
		for(var i = 0; i < bubbleCombo.length; i++){
			bubbleCombo = concatUnique(bubbleCombo, checkAllAdjacentBubbles(bubbleCombo[i], checkBubble));
		}
		
		return bubbleCombo;
	};
	
	//TODO is this still needed with the new coordinate system?
	var bubbleCRToIndex = function(atC,atR) {
		return atC + (atR+atC/2) * cols;
	};
	
	//Finds the suit/color at a given pixel
	var findSuitHere = function(x, y){
		var hex = screenCoordsToGrid(x, y);
		
		if(hex.x < cols && hex.x >= 0 && hex.y < rows && hex.y >= 0){
			console.log(hex.x + ", " + hex.y + ": " + bubbleArray[hex.x][hex.y].value);
			return bubbleArray[hex.x][hex.y].value;
		} else{
			return undefined;
		}
	};
	
	var drawBubble = function(bubble) {
		var center = gridCoordsToScreen(bubble.col, bubble.row);
		if(useCardSuits) {
			drawCenteredImage(canvasContext, bubbleImage[bubble.value], center.x, center.y);
		} else {
			drawCircleFill(canvasContext, center.x, center.y, 26, bubbleColor[bubble.value], 1);
		}
	};
	
	var drawAllBubbles = function(){
		runOnAllBubbles(drawBubble);
	};
	
	var randomBubbleColor = function() {
		return Math.floor(Math.random()*(BUBBLE_KINDS - 1)) + 1;
	};
	
	var genStartBubbles = function(){
		for(var c = 0; c < cols; c++){
			for(var r = 0; r < rows; r++){
				if(r < initialRows){
					bubbleArray[c][r] = new Bubble(c, r, randomBubbleColor());
				} else{
					bubbleArray[c][r] = BUBBLE_NONE;
				}
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
	
	//TODO test with new grid system (more like remove)
/*	var gridCoordsToArray = function(q, r){
		var y = r;
		var x = q + Math.floor(y/2);
		return new Point(x, y);
	};
*/
	
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
		if(r === undefined){
			r = c.row;
			c = c.col;
		}
		
		var x = offsetX + c * spacingX + r%2 * spacingX/2;
		var y = offsetY + r * spacingY;
		
		return new Point(x, y);
	};
	
	//Take pixel coordinates and return coordinates of hex that pixel is in
	var screenCoordsToGrid = function(x, y){
		/*if(y === undefined){
			y = x.y;
			x = x.x;
		}
		*/
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
	
	var attatchBubble = function(c, r, v) {
		if(c < cols && c >= 0 && r < rows && r >= 0){
			bubbleArray[c][r] = new Bubble(c, r, v);
		}
	};
	
	var attatchBall = function(x, y, value){
		var coords = screenCoordsToGrid(x, y);
		attatchBubble(coords.x, coords.y, value);
	};
	
	return {
		size: size,
		screenCoordsToGrid: screenCoordsToGrid,
		findSuitHere: findSuitHere,
		drawBounds: drawBounds,
		hexRound: hexRound,
		debugScreen: debugScreen,
		drawAllBubbles: drawAllBubbles,
		//gridCoordsToArray: gridCoordsToArray,
		findCombo: findCombo,
		//attatchBubble: attatchBubble,
		attatchBall: attatchBall,
		bubbleArray: bubbleArray,
		checkConnected: checkConnected,
		bubbleImage: bubbleImage,
		randomBubbleColor: randomBubbleColor,
	};
};
