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
			mouse.left = true;
			if(debug){console.log("Mouse 0");} //debug
			if(!Menu.isActive() && !cannon.projectile){
				cannon.fire();
			}
			break;
		case 1:
			mouse.middle = true;
			if(debug){console.log("Mouse 1");} //debug
			if(debug && !Menu.isActive()){console.log("bubble", grid.findBubbleHere(mouse.x, mouse.y));}// grid.dropDown();} //debug
			evt.preventDefault();
			break;
		case 2:
			mouse.right = true;
			if(debug){console.log("Mouse 2");} //debug
			if(debug && !Menu.isActive()){cannon.swapValues();} //debug
			if (!Menu.isActive()) {
				var bubble = grid.findBubbleHere(mouse.x / gameWidth, mouse.y);
				if (bubble) {
					console.log('Explode', grid.screenCoordsToGrid(mouse.x, mouse.y));
					bubblePopper.push(bubble);
				}
			}
			break;
	}
}

function mouseReleased(evt) {
	switch(evt.button){
		case 0:
			if(debug && !Menu.isActive()){console.log("Mouse 0 up", grid.screenCoordsToGrid(mouse.x,mouse.y));} //debug
			mouse.left = false;
			break;
		case 1:
			if(debug && !Menu.isActive()){console.log("Mouse 1 up", grid.screenCoordsToGrid(mouse.x,mouse.y));} //debug
			evt.preventDefault();
			mouse.middle = false;
			break;
		case 2:
			if(debug && !Menu.isActive()){console.log("Mouse 2 up", grid.screenCoordsToGrid(mouse.x,mouse.y));} //debug
			mouse.right = false;
			break;
	}
}

function updateMousePos(evt) {
	var rect = drawingCanvas.getBoundingClientRect();

	mouse.x = Math.round((evt.clientX - rect.left)/drawScaleX);
	mouse.y = Math.round((evt.clientY - rect.top)/drawScaleY);
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
