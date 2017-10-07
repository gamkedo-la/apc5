var Menu = function () {
	var inMenu = true;
	var showingCredits = false;
	var buttons = [];
	var inGameButtons = [];

	var normalGame = function() {
		Game.restart(GAME_NORMAL);
		inMenu = false;
	};

	var unlimitedGame = function() {
		Game.restart(GAME_UNLIMITED);
		inMenu = false;
	};

	var showCredits = function() {
		showingCredits = true;
	};

	var palletSwap = function() {
		rgbMode = !rgbMode;
		inGameButtons = [];
		
		if(rgbMode) {
			bubbleColors = rgbColorList;
			inGameButtons.push(new MenuButton("Colors: RGB", 12, palletSwap));
		}
		else {
			bubbleColors = cmykColorList;
			inGameButtons.push(new MenuButton("Colors: Paint", 12, palletSwap));
		}
	};
	
	var initialize = function() {
		Game.restart();
		buttons.push(new MenuButton('Normal Mode', 6, normalGame));
		buttons.push(new MenuButton('Unlimited Mode', 8, unlimitedGame));
		buttons.push(new MenuButton('Team Credits', 15, showCredits));
		inGameButtons.push(new MenuButton("Colors: RGB", 12, palletSwap));
	};

	var update = function(){
		if (inMenu) {
			if(showingCredits) {
				if (mouse.left) {
					mouse.left = false;
					showingCredits = false;
				}
			} else {
				for (var i = 0; i < buttons.length; i++) {
					buttons[i].checkClick();
				}
			}
		} else {
			for (var i = 0; i < inGameButtons.length; i++) {
				inGameButtons[i].checkClick();
			}
		}
	};

	var draw = function(){
		if (inMenu) {
			if(showingCredits) {
				var creditsTextX = 10;
				var textLineY = 35;
				var lineHeightWithOffset = 35;
				drawText(scoresContext, creditsTextX, textLineY, fontColorHighlight,
					"Nicholas Polchies");
				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColor,
					"Team Lead");

				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColor,
					"Core Game Code");
				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColor,
					"Grid Logic");
				textLineY+=lineHeightWithOffset;

				drawText(scoresContext, creditsTextX, textLineY, fontColorHighlight,
					"SpadXIII");
				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColor,
					"Particle Effects");
				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColor,
					"Cannon Powerup");
				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColor,
					"Sound/BG Code");
				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColor,
					"Code Cleanup");

				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColorHighlight,
					"c:games");
				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColor,
					"Bubble, BG Art");
				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColor,
					"Music");
				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColor,
					"Color Mix Concept");

				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColorHighlight,
					"Chris Markle");
				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColor,
					"Dashed Aimer");

				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColorHighlight,
					"Jeremy Kenyon");
				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColor,
					"Menu Code");

				textLineY+=lineHeightWithOffset;
				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColorHighlight,
					"by gamkedo.club");

				
				textLineY+=lineHeightWithOffset;
				drawText(scoresContext, creditsTextX, textLineY, fontColor, "- Click to Return -");
			} else {
				drawText(scoresContext, 25, 50, fontColor, "APC5");

				for (var i = 0; i < buttons.length; i++) {
					buttons[i].draw();
				}
			}
		} else {
			for (var i = 0; i < inGameButtons.length; i++) {
				inGameButtons[i].draw();
			}
		}
	};

	var activate = function() {
		Game.restart();
		inMenu = true;
	};

	var isActive = function() {
		return inMenu;
	};

	// Private button class
	var MenuButton = function(_t, _index, _callback) {
		scoresContext.font = gameFont;

		var offsetX = (gameCanvas.width * drawScaleX * gameWidth) / drawScaleX;
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
				mouse.left = false;
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
		isActive: isActive,
		activate: activate
	};
}();
