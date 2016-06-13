var Ball = function () {
	var size = 25;
	var x = 0;
	var y = 0;
	var speed = 5;
	var vx = 0;
	var vy = 0;
	var color = "#00FFFF";
	var fired = false;

	var reset = function(){
		fired = true;

		// Make sure the ball is set right at the end of the cannon barrel
		var nozzle = cannon.width + (size - 2);
		x = cannon.x + Math.cos(cannon.rotation()) * nozzle;
		y = cannon.y + Math.sin(cannon.rotation()) * nozzle;

		// Calculate the speed
		vx = Math.cos(cannon.rotation()) * speed;
		vy = Math.sin(cannon.rotation()) * speed;
	};

	var move = function(){
		if (mouse.left && !fired) {
			reset();
		}

		if (fired) {
            x += vx;
            y += vy;
        }

        // Very simple out of bounds check for debugging
        if (y < 0) {
            fired = false;
        }
	};

	var draw = function(){
		if (fired) {
			drawCircleFill(x, y, size, color, 1);
		}
	};

    var hasFired = function(){
        return fired;
    };

	return {
		x: x,
		y: y,
		size: size,
		color: color,
		draw: draw,
		move: move,
        hasFired: hasFired
	};
};
