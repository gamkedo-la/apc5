var Bubble = function(c, r, val){
	var col = c;
	var row = r;
	var value = val;
	var connected = true;
	var exploding = false;
	var explodeDelay = 0;

	var willExploding = function() {
		return exploding;
	};

	var isExploding = function() {
		return exploding && (explodeDelay-- < 0);
	};

	var explode = function(delay) {
		explodeDelay = delay;
		exploding = true;
	};
	
	return {
		col: col,
		row: row,
		value: value,
		connected: connected,
		explode: explode,
		willExplode: willExploding,
		isExploding: isExploding
	};
};
