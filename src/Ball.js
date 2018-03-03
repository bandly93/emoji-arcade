import { drawArcObj } from './utils/drawUtils.js';

export default class Ball{
	constructor({context,x,y,radius,fillStyle,id}){	
		this.id = id;
		this.x = x || 300;
		this.y = y || 200;
		this.starting_x = this.x;
		this.starting_y = this.y;
		this.fillStyle = fillStyle || 'orange';
		this.dx = 6;
		this.dy = 0;
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
		}	
	}
		
	switchBallDirection(){
		if(this.dx === 0){
			this.dx = 6;
			this.dy = 0;
		}else{
			this.dx = 0;
			this.dy = 6;
		}
	}	
	
	draw(){
		drawArcObj(this);		
	}
		
	checkBoundaries = (x,y) => {
		//left to right	
		if(x + this.dx > this.canvas_w - this.ballRadius || x + this.dx < this.ballRadius) {
			this.dx = -this.dx;
		}
		//up and down
		if(y + this.dy > this.canvas_h - this.ballRadius || y + this.dy < this.ballRadius) {
			this.dy = -this.dy
		}
 	}
	
	update(){
		this.draw();
		//this.checkBoundaries(this.x,this.y)
		this.context.clearRect(0,0,this.canvas_w,this.canvas_h)
		this.x += this.dx;
		this.y += this.dy;	
	}	
}

