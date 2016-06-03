function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor, rotation, centerX, centerY) {
	canvasContext.save();
	canvasContext.translate(topLeftX, topLeftY);
	canvasContext.rotate(rotation);
	
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(0 + centerX, 0 + centerY, boxWidth, boxHeight);
	
	canvasContext.restore();
}
