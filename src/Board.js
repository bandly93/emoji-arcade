class Peg{
	constructor({context,x,y,id}){
		this.id = id;
		this.x = x;
		this.y = y;
		this.context = context;
		this.canvas_w = context.canvas.width;
		this.canvas_h = context.canvas.height;
		this.pegRadius = 3;
		this.fillStyle = 'white';
	}
	
	drawPeg(){
		this.context.beginPath();
		this.context.arc(this.x,this.y,this.pegRadius,0,Math.PI*2);
		this.context.fillStyle = this.fillStyle;
		this.context.fill();
		this.context.closePath();
		requestAnimationFrame(()=>this.drawPeg());	
	}
	physics(){


	}	
}

export default class Board{
	constructor({context,x,y}){
		this.canvas_w = context.canvas.width;
		this.canvas_h = context.canvas.height;	
		this.context = context;
	}

	createPegAndDraw = () => {
		const { width , height } = this.context.canvas
		let x = 45;
		let y = 50;	
		const { context } = this;
		for ( let i = 0; i < 63; i++){
			//if x is larger than width;
			if(x > width){
				//generate new x and y
				x = x % width;
				y += 35;
				let peg = new Peg({context,x,y,id:i});
				peg.drawPeg();
			}else{
				let peg = new Peg({context,x,y,id:i});
				peg.drawPeg();

			}	
			x += 45;
		}	
	}
	
	drawBottomLines = () => {
		const {width,height} = this.context.canvas;
		const numOfLines = 10;
		
		let x = width/numOfLines
				
		for(let i = 0; i < numOfLines-1; i++){
			this.context.beginPath();
			this.context.rect(x*(i+1),270,2,110)
			this.context.fillStyle = 'white';
			this.context.fill();
			this.context.closePath();
		}
		
		requestAnimationFrame(()=>this.drawBottomLines());
	}

	draw(){
		this.drawBottomLines();
		this.createPegAndDraw();
	}	
}
