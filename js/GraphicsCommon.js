function drawBubble(canvasContext, cx, cy, color, size) {
	drawCircleFill(canvasContext, cx, cy, size, color, 1);

	var w = imgBubbleMask.width;
	var h = imgBubbleMask.height;
	if (size != bubbleSize) {
		var ratio = size/bubbleSize;
		w *= ratio;
		h *= ratio;
	}

	canvasContext.drawImage(imgBubbleMask, cx-w/2, cy-h/2, w, h);
}

function drawCenteredImage(canvasContext, imageVar, cx, cy) {
	canvasContext.drawImage(imageVar,
		cx-imageVar.width/2, cy-imageVar.height/2);
}

function drawLines(canvasContext, pointArray){
	canvasContext.beginPath();
	canvasContext.moveTo(pointArray[0].x, pointArray[0].y);
	for(var i = 1; i < pointArray.length; i++){
		canvasContext.lineTo(pointArray[i].x, pointArray[i].y);
	}
	canvasContext.stroke();
}

function drawPixel(canvasContext, x, y, color){
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x, y, 1, 1);
}

function colorRect(canvasContext, topLeftX,topLeftY, width,height, fillColor, rotation, centerX, centerY) {
	if(!centerX){
		centerX = 0;
	}
	if(!centerY){
		centerY = 0;
	}
	if(!rotation){
		rotation = 0;
	}
	canvasContext.save();
	canvasContext.translate(topLeftX, topLeftY);
	canvasContext.rotate(rotation);

	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(0 + centerX, 0 + centerY, width, height);

	canvasContext.restore();
}

function drawCircleFill(canvasContext, centerX, centerY, size, color, alpha) {
	// canvasContext.lineWidth = 1;

	if(alpha === undefined)
	{
		alpha = 1;
	}

	canvasContext.beginPath();
	canvasContext.save();
	canvasContext.scale(size, size);
	canvasContext.arc(centerX/size, centerY/size, 1, 0, 2 * Math.PI);
	canvasContext.globalAlpha = alpha;
	canvasContext.fillStyle = color;
	canvasContext.closePath();
	canvasContext.fill();
	canvasContext.restore();
}

function drawText(canvasContext, topLeftX,topLeftY, fillColor, text) {
	canvasContext.font = gameFont;
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(text, topLeftX,topLeftY);
}
