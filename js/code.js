var canvasWidth = 490;
var canvasHeight = 220;

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();

var paint;
var canvas;
var context;

var colorRed = "#d9534f";
var colorGreen = "#5cb85c";
var colorBlue = "#5bc0de";

var curColor = colorRed;
var clickColor = new Array();

var sizeSmall = 3;
var sizeNormal = 6;
var sizeLarge = 9;

var clickSize = new Array();
var curSize = sizeNormal;

function executeArticleScript() {
	prepareCanvas();
}


function prepareCanvas()
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	var canvasDiv = document.getElementById('canvasDiv');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'myCanvas');
	canvasDiv.appendChild(canvas);
	
	context = canvas.getContext("2d");
	
	// Add mouse events
	// ----------------
	$('#myCanvas').mousedown(function(e)
	{
		// Mouse down location
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		
		paint = true;
		addClick(mouseX, mouseY, false);
		redraw();
	});
	
	$('#myCanvas').mousemove(function(e){
		if(paint){
			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redraw();
		}
	});
	
	$('#myCanvas').mouseup(function(e){
		paint = false;
	  	redraw();
	});
	
	$('#myCanvas').mouseleave(function(e){
		paint = false;
	});
	
	$('#clearCanvas').mousedown(function(e)
	{
		clickX = new Array();
		clickY = new Array();
		clickDrag = new Array();
		clickColor = new Array();
		clickSize = new Array();
		clearCanvas(); 
	});

	$('#chooseRed').mousedown(function(e){
		curColor = colorRed;
	});
	$('#chooseGreen').mousedown(function(e){
		curColor = colorGreen;
	});
	$('#chooseBlue').mousedown(function(e){
		curColor = colorBlue;
	});

	$('#chooseSmall').mousedown(function(e){
		curSize = sizeSmall;
	});
	$('#chooseNormal').mousedown(function(e){
		curSize = sizeNormal;
	});
	$('#chooseLarge').mousedown(function(e){
		curSize = sizeLarge;
	});
}

function addClick(x, y, dragging)
{
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
	clickColor.push(curColor);
	clickSize.push(curSize);
}

function clearCanvas()
{
	context.clearRect(0, 0, canvasWidth, canvasHeight);
}

function redraw()
{
	clearCanvas();
	
	context.lineJoin = "round";
			
	for(var i=0; i < clickX.length; i++)
	{		
		context.beginPath();
		if(clickDrag[i] && i){
			context.moveTo(clickX[i-1], clickY[i-1]);
		}else{
			context.moveTo(clickX[i]-1, clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.strokeStyle = clickColor[i];
		context.lineWidth = clickSize[i];
		context.stroke();
	}
}