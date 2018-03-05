export const drawArcObj = (args) => {
	const { x,y,radius,fillStyle } = args;
	args.context.beginPath();
	args.context.arc(x,y,radius,0,Math.PI*2);
	args.context.fillStyle = fillStyle;
	args.context.fill();
	args.context.closePath();
}

export const drawRectObj = (args) => {	
	const { x,y,line_width,line_height,fillStyle } = args;	
	args.context.beginPath();
	args.context.rect(x,y,line_width,line_height);
	args.context.fillStyle = fillStyle;
	args.context.fill();
	args.context.closePath();
}

export const drawTextObj = (args) => {
	const { text } = args;
	let style = {
		font: '10px Comic Sans MS',
		fillStyle : 'red',
		textAlign : 'center',
	}
	args.context.font = style.font;
	args.context.fillStyle = style.fillStyle;
	args.context.textAlign = style.textAlign;
	args.context.fillText(text,400,30);
}


