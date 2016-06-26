var Bubble = function(_c, _r, _v){
	var col = _c;
	var row = _r;
	var value = _v ? _v : randomColor();
	var connected = true;
	
	var explode = function(){
		// spawn particles!
		var hexCenter = grid.gridCoordsToScreen(col, row);
		var numParticles = 4 + Math.floor(Math.random() * 8);
		for (var i = 0; i < numParticles; i++) {
			var tempParticle = new Particle(hexCenter.x, hexCenter.y, value);
			particleList.push(tempParticle);
		}
	};
	
	var draw = function(){
		var center = grid.gridCoordsToScreen(col, row);
		drawCircleFill(canvasContext, center.x, center.y, bubbleSize, value, 1);
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
			return true;
		}
		return false;
	};
	
	var getValue = function(){
		return value;
	};
	
	return {
		getValue: getValue,
		
		
		col: col,
		row: row,
		//value: this.value,
		connected: connected,
		explode: explode,
		draw: draw,
		combineColors: combineColors,
		getCombinedIndex: getCombinedColorIndex
	};
};

//Handle exploding bubbles
var BubblePopper = function(){
	var explodingBubbles = [];
	var explodeInterval = 6;
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
			grid.removeBubble(bubblesIn);
		}
		
		for(var i = 0; i < bubblesIn.length; i++){
			explodingBubbles.push(bubblesIn[i]);
			grid.removeBubble(bubblesIn[i]);
		}
	};
	
	var update = function(){
		if(explodingBubbles.length > 0){
			if(explodeDelay <= 0){
				explodingBubbles[0].explode();
				explodingBubbles.shift();
				explodeDelay = explodeInterval;
			}
			explodeDelay--;
		}
	};
	
	return {
		draw: draw,
		push: push,
		update: update,
	};
}();
