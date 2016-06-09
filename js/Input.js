function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('mousedown', mousePressed);
	canvas.addEventListener('mouseup', mouseReleased);

	canvas.addEventListener('contextmenu', function(e) {
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
			mouse.left = true;
			grid.findSuitHere(mouse.x,mouse.y);
			break;
		case 1:
			if(debug){console.log("Mouse 1");} //debug
			evt.preventDefault();
			mouse.middle = true;
			break;
		case 2:
			if(debug){console.log("Mouse 2");} //debug
			mouse.right = true;
			break;
	}
}

function mouseReleased(evt) {
	switch(evt.button){
		case 0:
			if(debug){console.log("Mouse 0 up");} //debug
			mouse.left = false;
			break;
		case 1:
			if(debug){console.log("Mouse 1 up");} //debug
			evt.preventDefault();
			mouse.middle = false;
			break;
		case 2:
			if(debug){console.log("Mouse 2 up");} //debug
			mouse.right = false;
			break;
	}
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	//var root = document.documentElement;
	
	mouse.x = evt.clientX - rect.left;// - root.scrollLeft;
  	mouse.y = evt.clientY - rect.top;// - root.scrollTop;
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
		right: right,
	};
})();
