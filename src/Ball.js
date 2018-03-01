export default class Ball{
	constructor({context,x,y,ballRadius,fillStyle}){
		this.x = x || 300;
		this.y = y || 200;
		this.starting_x = this.x;
		this.starting_y = this.y;
		this.fillStyle = fillStyle || 'orange';
		this.dx = 6;
		this.dy = 3;
		this.ballRadius = ballRadius || 10;
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
		this.context.beginPath();
		this.context.arc(this.starting_x,this.starting_y,this.ballRadius,0,Math.PI*2);	
		this.context.fillStyle = this.fillStyle;
		this.context.fill();
		this.context.closePath();
	}
		
	checkBoundaries = (x,y) => {
		//left to right	
		if(x + this.dx > this.canvas_w - this.ballRadius || x + this.dx < this.ballRadius) {
			this.dx = -this.dx;
		}
		//up and down
		if(y + this.dy > this.canvas_h - this.ballRadius || y + this.dy < this.ballRadius) {
			//this.dy = -this.dy;
			this.dy = -this.dy
		}
 	}
	
	move(){
		this.context.beginPath();
		this.context.arc(this.x,this.y,this.ballRadius,0,Math.PI*2);
		this.context.fillStyle = this.fillStyle;
		this.context.fill();
		this.context.closePath();
		this.checkBoundaries(this.x,this.y)	
		requestAnimationFrame(()=>this.update())
	}

	update(){
		requestAnimationFrame(()=>this.move())
		this.context.clearRect(0,0,this.canvas_w,this.canvas_h)
		this.x += this.dx;
		this.y += this.dy;	
	}	
}

