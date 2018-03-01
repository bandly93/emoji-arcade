class Peg{
	constructor({context,x,y,id}){
		this.id = id;
		this.x = x;
		this.y = y;
		this.context = context;
		this.canvas_w = context.canvas.width;
		this.canvas_h = context.canvas.height;
		this.pegRadius = 5;
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
}

export default class Board{
	constructor({context,x,y}){
		this.canvas_w = context.canvas.width;
		this.canvas_h = context.canvas.height;	
		this.context = context;
	}

	createPegAndDraw = () => {
		const { width , height } = this.context.canvas
		let x = 50;
		let y = 50;	
		const { context } = this;
		for ( let i = 0; i < 57; i++){
			//if x is larger than width;
			if(x > width){
				//generate new x and y
				x = x % width;
				y += 50;
				let peg = new Peg({context,x,y});
				peg.drawPeg();
			}else{
				let peg = new Peg({context,x,y});
				peg.drawPeg();

			}	
			x += 50;
		}	
	}

	draw(){
		this.createPegAndDraw();
	}	
}
