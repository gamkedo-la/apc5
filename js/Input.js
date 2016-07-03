function setupInput() {
	drawingCanvas.addEventListener('mousemove', updateMousePos);
	drawingCanvas.addEventListener('mousedown', mousePressed);
	drawingCanvas.addEventListener('mouseup', mouseReleased);
	
	drawingCanvas.addEventListener('contextmenu', function(e) {
	      if (e.button === 2) { // block right click menu
	       e.preventDefault();
	        return false;
	      }
	  }, false);
}

function mousePressed(evt) {
	switch(evt.button){
		case 0:
			if(debug){console.log("Mouse 0");} //debug
			if(inMenu && mouse.x > menuBackgroundX && mouse.x < menuBackgroundX + menuBackgroundWidth &&
			mouse.y > menuBackgroundY && mouse.y < menuBackgroundY + menuBackgroundWidth / 2){
				console.log("Start normal game!");
				inMenu = false;
				startGame();
				break;
			} else if (inMenu && mouse.x > unlimitedModeButtonX && mouse.x < unlimitedModeButtonX + menuBackgroundWidth &&
			mouse.y > menuBackgroundY + menuBackgroundWidth / 2  && mouse.y < menuBackgroundY + menuBackgroundWidth){
				console.log("Start unlimited game!");
				inMenu = false;
				startGame();
				break;
			}
			if(!inMenu && !cannon.projectile){
				cannon.fire();
			}
			mouse.left = true;
			grid.findBubbleHere(mouse.x,mouse.y);
			break;
		case 1:
			if(debug){console.log("Mouse 1", grid.findBubbleHere(mouse.x, mouse.y));}// grid.dropDown();} //debug
			evt.preventDefault();
			mouse.middle = true;
			break;
		case 2:
			if(debug){console.log("Mouse 2");cannon.swapValues();} //debug
			mouse.right = true;
			var bubble = grid.findBubbleHere(mouse.x/0.75,mouse.y);
			if (bubble) {
				console.log('Explode', grid.screenCoordsToGrid(mouse.x,mouse.y));
				bubblePopper.push(bubble);
			}
			break;
	}
}

function mouseReleased(evt) {
	switch(evt.button){
		case 0:
			if(debug){console.log("Mouse 0 up", grid.screenCoordsToGrid(mouse.x,mouse.y));} //debug
			mouse.left = false;
			break;
		case 1:
			if(debug){console.log("Mouse 1 up", grid.screenCoordsToGrid(mouse.x,mouse.y));} //debug
			evt.preventDefault();
			mouse.middle = false;
			break;
		case 2:
			if(debug){console.log("Mouse 2 up", grid.screenCoordsToGrid(mouse.x,mouse.y));} //debug
			mouse.right = false;
			break;
	}
}

function updateMousePos(evt) {
	var rect = drawingCanvas.getBoundingClientRect();
	//var root = document.documentElement;
	
	mouse.x = (evt.clientX - rect.left)/gameScaleX;// - root.scrollLeft;
	mouse.y = (evt.clientY - rect.top)/gameScaleY;// - root.scrollTop;
}

//mouse object stores mouse information
var mouse = (function () {
	//Position
	var x = 0;
	var y = 0;
	
	//Button states
	var left = 0;
	var right = 0;
	var middle = 0;
	
	//Return only public variables/methods
	return {
		x: x,
		y: y,
		left: left,
		middle: middle,
		right: right
	};
})();
