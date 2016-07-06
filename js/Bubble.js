var Bubble = function(_c, _r, _v){
	var col = _c;
	var row = _r;
	var value = _v ? _v : randomColor(true);
	var connected = true;
	
	var explode = function(){
		// spawn particles!
		var hexCenter = grid.gridCoordsToScreen(col, row);
		createParticles(4, 12, hexCenter.x, hexCenter.y, value);
	};
	
	var draw = function(){
		var center = grid.gridCoordsToScreen(col, row);
		drawBubble(gameContext, center.x, center.y, value, bubbleSize);
	};

	var getCombinedColorIndex = function(_valIndex){
		var valIndex = bubbleColors.indexOf(value);
		var newVal = valIndex;

		if(valIndex === _valIndex){
			return false;
		}
		//If both bubbles are primary colors, combine them
		else if(valIndex <= 3 && _valIndex <= 3){
			newVal += ++_valIndex;
		}
		//If both colors add to black, combine them
		else if(valIndex + _valIndex === 7){
			newVal = 7;
		}

		if(valIndex != newVal){
			return newVal;
		}
		return false;
	};
	
	var combineColors = function(_valIndex){
		var combinedIndex = getCombinedColorIndex(_valIndex);
		if (combinedIndex) {
			value = bubbleColors[combinedIndex];
			grid.handleCombo(this);
			return true;
		}
		return false;
	};
	
	var getValue = function(){
		return value;
	};
	
	var getPos = function(){
		return new Position(col, row);
	};
	
	var connect = function(){
		connected = true;
	};
	
	var disconnect = function(){
		connected = false;
	};
	
	var isConnected = function(){
		return connected;
	};
	
	var shiftDown = function(){
		row++;
	};
	
	return {
		getValue: getValue,
		getPos: getPos,
		isConnected: isConnected,
		shiftDown: shiftDown,
		connect: connect,
		disconnect: disconnect,
		explode: explode,
		draw: draw,
		combineColors: combineColors,
		getCombinedIndex: getCombinedColorIndex
	};
};

//Handle exploding bubbles
var BubblePopper = function(_interval){
	//var totalPopped = 0;
	var explodingBubbles = [];
	var explodeInterval = _interval;
	var explodeDelay = 0;
	
	//Draw exploding bubbles
	var draw = function(){
		for(var i = 0; i < explodingBubbles.length; i++){
			explodingBubbles[i].draw();
		}
	};
	
	var push = function(bubblesIn){
		if(explodeDelay <= 0){
			explodeDelay = explodeInterval;
		}
		
		if(bubblesIn.length === undefined){
			explodingBubbles.push(bubblesIn);
			grid.removeBubble(bubblesIn.getPos());
		}
		
		for(var i = 0; i < bubblesIn.length; i++){
			explodingBubbles.push(bubblesIn[i]);
			grid.removeBubble(bubblesIn[i].getPos());
		}
	};
	
	var update = function(){
		if(explodingBubbles.length > 0){
			if(explodeDelay <= 0){
				explodingBubbles[0].explode();
				Game.addPop(1);
				explodingBubbles.shift();
				explodeDelay = explodeInterval;
			}
			explodeDelay--;
		}
	};
	
	/*
	var getNumPopped = function(){
		return totalPopped;
	};
	*/

	var restart = function(){
		explodingBubbles = [];
		explodeDelay = 0;
	};

	return {
		draw: draw,
		push: push,
		update: update,
		restart: restart,
		//getNumPopped: getNumPopped,
	};
};
