var Sound = function(_file) {
	var timeOut = 8;
	var lastPlay = 0;
	var numSounds = 5;
	var queue = [];
	var index = 0;

	for (var i = 0; i < numSounds; i++) {
		queue[i] = new Audio(_file);
	}

	var play = function() {
		if (SoundButtons.soundIsMuted()) {
			return;
		}
		if (Date.now() - lastPlay > timeOut) {
			lastPlay = Date.now();
			queue[index].currentTime = 0;
			queue[index].play();

			index++;
			if (index >= numSounds) {
				index = 0;
			}
		}
	};

	return {
		play: play
	};
};

var SoundButtons = function() {
	var musicX = 25;
	var soundX = 55;
	var y;
	var musicMuted = false;
	var soundMuted = false;

	var halfWidth;
	var halfHeight;
	var offsetX;

	var initialize = function() {
		halfWidth = iconMusicOn.width / 2;
		halfHeight = iconMusicOn.height / 2;
		y = scoresCanvas.height - 25;
		musicX += halfWidth;
		soundX = musicX + iconMusicOn.width + 5;

		offsetX = (gameCanvas.width * drawScaleX * gameWidth) / drawScaleX;
	};

	var update = function() {
		if (checkClick(musicX)) {
			musicMuted = music.muted = !music.muted;
		}
		if (checkClick(soundX)) {
			soundMuted = !soundMuted;
		}
	};

	function soundIsMuted() {
		return soundMuted;
	}

	var checkClick = function(x) {
		var checkX = mouse.x - offsetX;
		var overButton = x+halfWidth > checkX && checkX > x-halfWidth &&
			y+halfHeight > mouse.y && mouse.y > y-halfHeight;

		if (mouse.left && overButton) {
			mouse.left = false;
			return true;
		}
	};

	var draw = function() {
		if (musicMuted) {
			drawCenteredImage(scoresContext, iconMusicMuted, musicX, y);
		}
		else {
			drawCenteredImage(scoresContext, iconMusicOn, musicX, y);
		}
		if (soundMuted) {
			drawCenteredImage(scoresContext, iconSoundMuted, soundX, y);
		}
		else {
			drawCenteredImage(scoresContext, iconSoundOn, soundX, y);
		}
	};

	return {
		soundIsMuted: soundIsMuted,
		draw: draw,
		update: update,
		initialize: initialize
	};
}();
