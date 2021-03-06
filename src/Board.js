import { drawArcObj,drawRectObj } from './utils/drawUtils.js';

class Peg{
	constructor(args){
		const { context,x,y,id} = args;
		this.id = id;
		this.x = x;
		this.y = y;
		this.context = context;
		this.radius = 3;
		this.fillStyle = 'white';
	}

	get Description(){
		return {
			x:this.x,
			y:this.y,
		}
	}
	
	drawPeg(){	
		drawArcObj(this);
	}		
}

export default class Board{
	constructor(args){	
		const { context } = args;
		this.context = context;
		this.pegs = [];	
	}

	createPegAndDraw = () => {
		const { width } = this.context.canvas;
		const { context } = this;	
		let x = 45;
		let y = 50;
		let peg;
			
		//if x is outside range generate new x and y;	
		for ( let i = 0; i < 57; i++){		
			if(x > width){
				x = (x) % width;
				y += 35;			
			}
			peg = new Peg({ context,x,y,id:i});	
			peg.drawPeg();
			this.pegs.push(peg.Description);
			x += 50;
		}
	}
	
	drawBottomLines = () => {
		const { width } = this.context.canvas;
		const numOfLines = 9;
			
		for(let i = 0; i < numOfLines; i++){
			let data = {
				x: width/numOfLines * ( i + 1),
				y: 270,
				line_width: 2,
				line_height : 110,
				fillStyle : 'white',
				context:this.context
			}	
			drawRectObj(data);	
		}	
	}

	draw(){
		this.drawBottomLines();
		this.createPegAndDraw();	
	}
}
