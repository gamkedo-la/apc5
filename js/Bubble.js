var Bubble = function(c, r, val){
	var col = c;
	var row = r;
	var value = val;
	var connected = true;
	
	return {
		col: col,
		row: row,
		value: value,
		connected: connected,
	};
};