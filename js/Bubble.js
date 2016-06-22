var Bubble = function(c, r, val){
	var col = c;
	var row = r;
	var value = val;
	var connected = true;
	var exploding = false;

	var isExploding = function() {
		return exploding;
	};

	var explode = function() {
		exploding = true;
	};
	
	return {
		col: col,
		row: row,
		value: value,
		connected: connected,
		explode: explode,
		isExploding: isExploding
	};
};
