import { drawArcObj } from './utils/drawUtils.js';

export default class Ball{
	constructor({context,x,y,dx,dy,radius,fillStyle,id}){	
		this.id = id;
		this.x = x || 100;
		this.y = y || 25;
		this.fillStyle = fillStyle || 'orange';
		this.dx = dx || 3;
		this.dy = dy || 0;
		this.radius = radius || 10;
		this.context = context;
		this.canvas_w = context.canvas.width;
		this.canvas_h = context.canvas.height;	
		document.addEventListener('keydown',this.keyDownHandler,false);
		document.addEventListener('keyup',this.keyUpHandler,false);
	}

	keyDownHandler = (e) => {	
		if(e.keyCode == 32){
			this.switchBallDirection();
		}
	}

	get Position(){
		return{
			x:this.x,
			y:this.y,
			dx:this.dx,
			dy:this.dy,
		}	
	}
		
	switchBallDirection(){
		this.dx = 0;
		this.dy = 3;	
	}	
	
	draw(){
		drawArcObj(this);		
	}
		
	checkBoundaries = () => {
		//left to right	
		if(this.x + this.dx > this.canvas_w - this.radius || this.x + this.dx < this.radius){
			this.dx = -this.dx;
		}
		//up and down
		if(this.y + this.dy > this.canvas_h - this.radius ||this. y + this.dy < this.radius) {
			this.dy = -this.dy
		}
 	}
	
	update(){
		this.checkBoundaries();
		this.draw();
		this.x += this.dx;
		this.y += this.dy;	
	}	
}

