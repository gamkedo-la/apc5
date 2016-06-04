function colorRect(topLeftX,topLeftY, width,height, fillColor, rotation, centerX, centerY) {
	if(!centerX){
		centerX = 0;
	}
	if(!centerY){
		centerY = 0;
	}
	canvasContext.save();
	canvasContext.translate(topLeftX, topLeftY);
	canvasContext.rotate(rotation);
	
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(0 + centerX, 0 + centerY, width, height);
	
	canvasContext.restore();
}
