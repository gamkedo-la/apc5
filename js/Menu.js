var Menu = function () {
	var inMenu = true;
	var buttons = [];

	var normalGame = function() {
		inMenu = false;
	};

	var unlimitedGame = function() {
		inMenu = false;
	};

	var initialize = function() {
		buttons[0] = new MenuButton('Normal Mode', 0, normalGame);
		buttons[1] = new MenuButton('Unlimited Mode', 1, unlimitedGame);
	};

	var update = function(){
		if (inMenu) {
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].checkClick();
			}
		}
	};

	var draw = function(){
		if (inMenu) {
			drawText(scoresContext, 25, 50, fontColor, "APC5");
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].draw();
			}
		}
	};

	var isActive = function() {
		return inMenu;
	};

	// Private button class
	var MenuButton = function(_t, _index, _callback) {
		scoresContext.font = gameFont;

		var offsetX = (gameCanvas.width * gameScaleX * 0.75) / gameScaleX;
		var width = scoresContext.measureText(_t).width;
		var height = 30;
		var heightOffset = 5;
		var x = 25;
		var y = 100 + _index * (height + heightOffset);
		var text = _t;
		var callback = _callback;

		var draw = function() {
			var color = fontColor;
			if (hover()) {
				color = fontColorHighlight;
			}

			drawText(scoresContext, x, y, color, text);
		};

		var hover = function() {
			var checkX = mouse.x - offsetX;
			return x + width > checkX && checkX > x &&
				y+heightOffset > mouse.y && mouse.y > y-height+heightOffset;
		};

		var checkClick = function() {
			if (mouse.left && hover()) {
				callback();
			}
		};

		return {
			draw: draw,
			hover: hover,
			checkClick: checkClick
		};
	};

	return {
		initialize: initialize,
		draw: draw,
		update: update,
		isActive: isActive
	};
}();
