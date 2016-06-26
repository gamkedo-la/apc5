var PreviewBubble = function(_v) {
	var value;
	var minAlpha = 0.35;
	var maxAlpha = 1;
	var alpha = minAlpha;
	var va = 0.01;
	var previewSize = bubbleSize * .6;

	var draw = function() {
		var bubble = grid.findBubbleHere(mouse.x,mouse.y);
		if (bubble) {
			var combinedIndex = bubble.getCombinedIndex(value);
			if (combinedIndex) {
				if (alpha > maxAlpha || alpha < minAlpha) {
					va = -va;
				}
				alpha += va;

				var center = grid.gridCoordsToScreen(bubble.getPos().c, bubble.getPos().r);
				drawCircleFill(canvasContext, center.x, center.y, previewSize, bubbleColors[combinedIndex], alpha);
			}
		}
	};

	var setValue = function(_v) {
		alpha = minAlpha;
		value = bubbleColors.indexOf(_v);
	};
	setValue(_v);

	return {
		draw: draw,
		setValue: setValue
	};
};
