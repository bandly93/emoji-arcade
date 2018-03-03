export const drawArcObj = (arg) => {
	const { x,y,radius,fillStyle } = arg;
	arg.context.beginPath();
	arg.context.arc(x,y,radius,0,Math.PI*2);
	arg.context.fillStyle = fillStyle;
	arg.context.fill();
	arg.context.closePath();
}

export const drawRectObj = (arg) => {	
	const { x,y,line_width,line_height,fillStyle } = arg;	
	arg.context.beginPath();
	arg.context.rect(x,y,line_width,line_height);
	arg.context.fillStyle = fillStyle;
	arg.context.fill();
	arg.context.closePath();
}




