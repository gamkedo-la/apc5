var PreviewBubble = function(_v) {
	var value;
	var vSize = 0.3;
	var minSize = bubbleSize * 0.4;
	var maxSize = bubbleSize * 0.8;
	var previewSize = minSize;

	var draw = function() {
		var bubble = grid.findBubbleHere(mouse.x,mouse.y);
		if (bubble) {
			var combinedIndex = bubble.getCombinedIndex(value);
			if (combinedIndex) {
				if (previewSize > maxSize || previewSize < minSize) {
					vSize = -vSize;
				}
				previewSize += vSize;

				var center = grid.gridCoordsToScreen(bubble.getPos().c, bubble.getPos().r);
				drawCircleFill(canvasContext, center.x, center.y, previewSize, bubbleColors[combinedIndex], 1);
			}
		}
	};

	var setValue = function(_v) {
		previewSize = minSize;
		value = bubbleColors.indexOf(_v);
	};
	setValue(_v);

	return {
		draw: draw,
		setValue: setValue
	};
};
