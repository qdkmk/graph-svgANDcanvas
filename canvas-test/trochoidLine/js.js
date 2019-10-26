let context;
let canvasWidth;
let canvasHeight;
let centerX;
let centerY;
const rc = 10000;
const rm = 9800;
const rd = 150;
function initialize() {
	const canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	centerX = canvasWidth / 2;
	centerY = canvasHeight / 2;
	context.fillRect(0, 0, canvasWidth, canvasHeight);
	context.strokeStyle = "hsla(244, 70%, 50%, 0.4)";
	context.fillStyle = "rgba(0, 0, 0, 0.06)";
	drawTrochoidLines();
}
function drawTrochoidLines(){
	let theta = (new Date().getTime()) / 1000;
	const delta = theta / 1000;
	theta %= (Math.PI * 2);
	let trochoidPoint = getTrochoidPoint(theta);
	context.globalCompositeOperation = "source-over";
	context.fillRect(0, 0, canvasWidth, canvasHeight);
	context.globalCompositeOperation = "lighter";
	context.beginPath();
	context.moveTo(trochoidPoint.x + centerX, trochoidPoint.y + centerY);
	for (let i = 0; i < 6; i++) {
		trochoidPoint = getTrochoidPoint(theta);
		theta += delta;
		context.lineTo(trochoidPoint.x + centerX, trochoidPoint.y + centerY);
	}
	context.stroke();
	window.requestAnimationFrame(drawTrochoidLines);
}
function getTrochoidPoint(theta) {
	const _x = (rc - rm) * Math.cos(theta) + rd * Math.cos((rc - rm) / rm * theta);
	const _y = (rc - rm) * Math.sin(theta) - rd * Math.sin((rc - rm) / rm * theta);
	return {x: _x, y: _y};
}
initialize();