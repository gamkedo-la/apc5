var Sound = function(_file) {
	var timeOut = 8;
	var lastPlay = 0;
	var numSounds = 5;
	var queue = [];
	var index = 0;

	for (var i = 0; i < numSounds; i++) {
		queue[i] = new Audio(_file);
	}

	this.play = function() {
		if (Date.now() - lastPlay > timeOut) {
			lastPlay = Date.now();
			queue[index].currentTime = 0;
			queue[index].play();

			index++;
			if (index >= numSounds) {
				index = 0;
			}
		}
	}
};
