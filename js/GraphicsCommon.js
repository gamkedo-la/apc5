function drawLines(pointArray){
	canvasContext.beginPath();
	canvasContext.moveTo(pointArray[0].x, pointArray[0].y);
	for(var i = 1; i < pointArray.length; i++){
		canvasContext.lineTo(pointArray[i].x, pointArray[i].y);
	}
	canvasContext.stroke();
}

function drawPixel(x, y, color){
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x, y, 1, 1);
}

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
